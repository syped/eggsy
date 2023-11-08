import { useSelector, useDispatch } from "react-redux";
import { loadProductsThunk } from "../../store/products";
import { useParams } from "react-router-dom";
import ProductReviews from "./ProductReviews";

function ProductPage() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const allProducts = useSelector(
    (state) => state.product.allProducts.Products
  );
  const { productId } = useParams();

  if (!allProducts || !allProducts.length) {
    dispatch(loadProductsThunk());
    return null;
  }

  let singleProduct;

  singleProduct = allProducts.find(
    (product) => product.id === parseInt(productId)
  );

  return (
    <>
      <img src={singleProduct.previewImage} />
      <div>{singleProduct.name}</div>
      <div>{singleProduct.price}</div>
      <div>{singleProduct.description}</div>
      <div>
        <ProductReviews singleProduct={singleProduct} />
      </div>
    </>
  );
}

export default ProductPage;
