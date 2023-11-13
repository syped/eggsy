import { useSelector, useDispatch } from "react-redux";
import { loadProductsThunk } from "../../store/products";
import { useParams, NavLink } from "react-router-dom";

function CategoryPage() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const allProducts = useSelector(
    (state) => state.product.allProducts.Products
  );
  const { category } = useParams();

  if (!allProducts || !allProducts.length) {
    dispatch(loadProductsThunk());
    return null;
  }

  let productList;

  if (category === "gaming-mice") {
    productList = allProducts.filter((product) => product.category === "mouse");
  } else if (category === "gaming-keyboards") {
    productList = allProducts.filter(
      (product) => product.category === "keyboard"
    );
  } else if (category === "gaming-headsets") {
    productList = allProducts.filter(
      (product) => product.category === "headset"
    );
  } else if (category === "gaming-monitors") {
    productList = allProducts.filter(
      (product) => product.category === "monitor"
    );
  }

  return (
    <>
      <div className="products">
        {productList.map((product) => (
          <div key={product.id} className="product">
            <NavLink to={`/products/${product.id}`}>
              <img src={product.previewImage} />
              <div className="product-name">{product.name}</div>
              <div className="product-price"> ${product.price}</div>
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoryPage;
