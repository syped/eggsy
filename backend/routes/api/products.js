const express = require("express");
const router = express.Router();

const { User, Product, ProductImage, Review } = require("../../db/models");

const { requireAuth } = require("../../utils/auth");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");

router.get("/", async (req, res) => {
  const products = await Product.findAll({
    include: [
      { model: ProductImage },
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: Review },
    ],
  });

  let productList = [];

  products.forEach((product) => {
    productList.push(product.toJSON());
  });

  productList.forEach((product) => {
    product.ProductImages.forEach((image) => {
      if (image.preview === true) {
        product.previewImage = image.url;
      }
    });
    if (!product.previewImage) {
      product.previewImage = "no preview image found";
    }

    // delete product.ProductImages;

    let sum = 0;
    let count = 0;

    product.Reviews.forEach((review) => {
      if (review) {
        sum += review.stars;
        count++;
      }
      let avg = sum / count;

      if (avg % 1 === 0) product.avgRating = avg.toFixed(1);
      else product.avgRating = avg.toFixed(2);
    });
    if (!product.avgRating) {
      product.avgRating = 0;
    }

    delete product.Reviews;
  });

  let result = { Products: productList };

  res.json(result);
});

router.post("/", requireAuth, async (req, res) => {
  const { name, category, description, price } = req.body;

  const product = await Product.create({
    userId: req.user.id,
    name,
    category,
    description,
    price,
  });

  res.status(201);
  return res.json(product);
});

router.post(
  "/:productId/images",
  requireAuth,
  singleMulterUpload("url"),
  async (req, res) => {
    const product = await Product.findByPk(req.params.productId);
    const user = await User.findByPk(req.user.id);

    if (product) {
      if (product.userId === user.id) {
        const { url, preview } = req.body;
        const imageUrl = await singlePublicFileUpload(req.file);

        const productImage = await ProductImage.create({
          productId: product.id,
          url: imageUrl,
          preview,
        });

        return res.json(productImage);
      } else {
        res.status(403);
        res.json({
          message: "Product must belong to current user",
        });
      }
    } else {
      res.status(404);
      res.json({
        message: "Product couldn't be found",
      });
    }
  }
);

router.get("/:productId", async (req, res) => {
  let product = await Product.findByPk(req.params.productId, {
    include: [
      { model: ProductImage },
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: Review },
    ],
  });

  if (product) {
    let count = 0;
    let sum = 0;

    product.Reviews.forEach((review) => {
      count++;
      sum += review.stars;
    });

    let avg = sum / count;

    if (sum === 0 && count === 0) avg = 0;

    if (avg % 1 === 0) product.avgRating = avg.toFixed(1);
    else product.avgRating = avg.toFixed(2);

    if (avg === 0) product.avgRating = avg;

    product.numReviews = count;

    delete product.Reviews;

    res.json(product);
  } else {
    res.status(404);
    res.json({
      message: "Product couldn't be found",
    });
  }
});

router.put("/:productId", requireAuth, async (req, res) => {
  let product = await Product.findByPk(req.params.productId);
  let userId = req.user.id;

  if (product) {
    if (product.userId === userId) {
      const { name, category, description, price } = req.body;

      await product.update({
        name,
        category,
        description,
        price,
      });
    } else {
      res.status(403);
      res.json({
        message: "Product must belong to current user",
      });
    }
  } else {
    res.status(404);
    res.json({
      message: "Product couldn't be found",
    });
  }

  res.json(product);
});

router.delete("/:productId", requireAuth, async (req, res) => {
  let product = await Product.findByPk(req.params.productId);
  let userId = req.user.id;

  if (product) {
    if (product.userId === userId) {
      await product.destroy();
    } else {
      res.status(403);
      res.json({
        message: "Product must belong to current user",
      });
    }
  } else {
    res.status(404);
    res.json({
      message: "Product couldn't be found",
    });
  }

  res.json({ message: "Product successfully deleted" });
});

router.get("/:productId/reviews", async (req, res) => {
  let product = await Product.findByPk(req.params.productId);

  if (product) {
    let reviews = await Review.findAll({
      where: {
        productId: product.id,
      },
      include: [{ model: User, attributes: ["id", "firstName", "lastName"] }],
    });

    res.json({ Reviews: reviews });
  } else {
    res.status(404);
    res.json({ message: "Product couldn't be found" });
  }
});

router.post("/:productId/reviews", requireAuth, async (req, res) => {
  let product = await Product.findByPk(req.params.productId);
  const { review, stars } = req.body;

  if (product) {
    const reviewCheck = await Review.findOne({
      where: {
        userId: req.user.id,
        productId: product.id,
      },
    });

    if (!reviewCheck) {
      const newReview = await Review.create({
        userId: req.user.id,
        productId: product.id,
        review,
        stars,
      });

      res.status(201);
      return res.json(newReview);
    } else {
      res.status(500);
      res.json({ message: "User already has a review for this product" });
    }
  } else {
    res.status(404);
    res.json({ message: "Product couldn't be found" });
  }
});

module.exports = router;
