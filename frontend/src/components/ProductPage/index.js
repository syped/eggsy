import { useSelector, useDispatch } from "react-redux";
import { loadProductsThunk } from "../../store/products";
import { getReviewsThunk } from "../../store/reviews";
import { useParams } from "react-router-dom";
import ProductReviews from "./ProductReviews";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { useEffect, useState } from "react";

function ProductPage() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const allProducts = useSelector(
    (state) => state.product.allProducts.Products
  );
  const productReviews = useSelector((state) => state.review.product.Reviews);
  const { productId } = useParams();
  const [dispatched, setDispatched] = useState(false);

  useEffect(() => {
    if (!dispatched && !productReviews?.length) {
      dispatch(getReviewsThunk(productId));
      setDispatched(true);
    }
  }, [dispatch, dispatched, productId, productReviews]);

  if (!allProducts || !allProducts.length) {
    dispatch(loadProductsThunk());
    return null;
  }

  let singleProduct;

  singleProduct = allProducts.find(
    (product) => product.id === parseInt(productId)
  );

  // if (singleProduct && !productReviews) {
  //   dispatch(getReviewsThunk(singleProduct.id));
  // }

  // const images = [
  //   {
  //     original: singleProduct.ProductImages[0].url,
  //     thumbnail: singleProduct.ProductImages[0].url,
  //   },
  //   {
  //     original: "https://picsum.photos/id/1015/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1015/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1019/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1019/250/150/",
  //   },
  // ];

  const gallery = [];

  if (!singleProduct) {
    dispatch(loadProductsThunk());
    return null;
  }

  singleProduct.ProductImages.forEach((image) => {
    gallery.push({
      original: image.url,
      thumbnail: image.url,
    });
  });

  return (
    <>
      <div className="single-product">
        <ImageGallery
          showPlayButton={false}
          thumbnailPosition="left"
          showIndex={true}
          items={gallery}
        />
        {/* <img src={singleProduct.previewImage} /> */}
        <div className="single-product-info">
          <div className="single-product-name">{singleProduct.name}</div>
          <div className="single-product-price">${singleProduct.price}</div>
          <div className="single-product-desc">{singleProduct.description}</div>
        </div>
      </div>
      <div className="reviews">
        {productReviews && productReviews.length ? (
          <div>
            <div className="review-header">{productReviews.length} Reviews</div>
            <ProductReviews singleProduct={singleProduct} />
          </div>
        ) : (
          <div>
            <div className="review-header">No Reviews</div>
            <ProductReviews singleProduct={singleProduct} />
          </div>
        )}
      </div>
    </>
  );
}

export default ProductPage;
