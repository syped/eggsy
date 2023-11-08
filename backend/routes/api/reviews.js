const express = require("express");
const router = express.Router();

const { User, Review } = require("../../db/models");

const { requireAuth } = require("../../utils/auth");

router.put("/:reviewId", requireAuth, async (req, res) => {
  let currentReview = await Review.findByPk(req.params.reviewId);
  let user = await User.findByPk(req.user.id);

  if (currentReview) {
    if (currentReview.userId === user.id) {
      const { review, stars } = req.body;

      await currentReview.update({
        review,
        stars,
      });
    } else {
      res.status(403);
      res.json({
        message: "Review must belong to the current user",
      });
    }
  } else {
    res.status(404);
    res.json({
      message: "Review couldn't be found",
    });
  }

  res.json(currentReview);
});

router.delete("/:reviewId", requireAuth, async (req, res) => {
  let review = await Review.findByPk(req.params.reviewId);
  let userId = req.user.id;

  if (review) {
    if (review.userId === userId) {
      await review.destroy();
    } else {
      res.status(403);
      res.json({ meesage: "Review must belong to the current user" });
    }
  } else {
    res.status(404);
    res.json({
      message: "Review couldn't be found",
    });
  }

  res.json({ message: "Successfully deleted" });
});

module.exports = router;
