import { useSelector, useDispatch } from "react-redux";
import { loadProductsThunk } from "../../store/products";
import { NavLink } from "react-router-dom";

function LandingPage() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const allProducts = useSelector(
    (state) => state.product.allProducts.Products
  );

  if (!allProducts || !allProducts.length) {
    dispatch(loadProductsThunk());
    return null;
  }

  return (
    <>
      {user && <div>Welcome back, {user.firstName}!</div>}
      <div>Shop by Category</div>
      <div>
        Shop for mice, keyboards, headsets, and more to level up your game!
      </div>
      <div className="category-cards">
        <NavLink to={`/c/gaming-mice`}>Gaming Mice</NavLink>
        <NavLink to={`/c/gaming-keyboards`}>Gaming Keyboards</NavLink>
        <NavLink to={`/c/gaming-headsets`}>Gaming Headsets</NavLink>
        <NavLink to={`/c/gaming-monitors`}>Gaming Monitors</NavLink>
      </div>
      {/* <div className="products">
        {allProductsArr.map((product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div> */}
    </>
  );
}

export default LandingPage;
