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
        <NavLink to={`/c/gaming-mice`}>
          <img src="https://cdn.mos.cms.futurecdn.net/KBo2a9UTWERNw38QyfBhPm-1200-80.jpeg" />
          <div className="mouse-card">Gaming Mice</div>
        </NavLink>
        <NavLink to={`/c/gaming-keyboards`}>
          <img src="https://media.wired.com/photos/61044c948eb98ab033ce464e/191:100/w_2580,c_limit/Gear-Logitech-G413-Keyboard.jpg" />
          <div className="keyboard-card">Gaming Keyboards</div>
        </NavLink>
        <NavLink to={`/c/gaming-headsets`}>
          <img src="https://media.accobrands.com/media/560-560/450139.jpg" />
          <div className="headset-card">Gaming Headsets</div>
        </NavLink>
        <NavLink to={`/c/gaming-monitors`}>
          <img src="https://i.pcmag.com/imagery/reviews/04NYZ3baAImtjHfPURtQ8og-1..v1673384999.jpg" />
          <div className="monitor-card">Gaming Monitors</div>
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
