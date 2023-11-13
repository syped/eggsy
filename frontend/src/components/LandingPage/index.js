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
      {user && (
        <div className="welcome-user">Welcome back, {user.firstName}!</div>
      )}
      <div className="shop-category-header">Shop by Category</div>
      <div className="category-desc">
        Shop for mice, keyboards, headsets, and more to level up your game!
      </div>
      <div className="category-cards">
        <NavLink className="mouse-card" to={`/c/gaming-mice`}>
          <img
            className="mouse-img"
            src="https://eggsy.s3.amazonaws.com/seed+images/g502-lightspeed-gallery-1.png"
          />
          <div>Gaming Mice</div>
        </NavLink>
        <NavLink className="keyboard-card" to={`/c/gaming-keyboards`}>
          <img
            className="keyboard-img"
            src="https://eggsy.s3.amazonaws.com/seed+images/black_shark_one_hand_mechanical_gaming_keyboard-.png"
          />
          <div>Gaming Keyboards</div>
        </NavLink>
        <NavLink className="headset-card" to={`/c/gaming-headsets`}>
          <img
            className="headset-img"
            src="https://eggsy.s3.amazonaws.com/seed+images/hyperx_-_cloud_alpha.png"
          />
          <div>Gaming Headsets</div>
        </NavLink>
        <NavLink className="monitor-card" to={`/c/gaming-monitors`}>
          <img
            className="monitor-img"
            src="https://eggsy.s3.amazonaws.com/seed+images/1658862796-canvas-27q-hero-black-wallpaper.png"
          />
          <div>Gaming Monitors</div>
        </NavLink>
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
