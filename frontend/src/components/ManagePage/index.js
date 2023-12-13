import { useSelector, useDispatch } from "react-redux";
import { loadProductsThunk } from "../../store/products";
import { NavLink, Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteProductModal from "../DeleteProductModal";

function ManageProducts() {
  const dispatch = useDispatch();

  const allProducts = useSelector(
    (state) => state.product.allProducts.Products
  );
  const user = useSelector((state) => state.session.user);

  if (!allProducts || !allProducts.length) {
    dispatch(loadProductsThunk());
    return null;
  }

  if (!user) return <Redirect to="/"></Redirect>;

  const userProductsArr = allProducts.filter(
    (product) => product.userId === user.id
  );

  if (!userProductsArr.length) {
    return (
      <>
        <div className="manage-product-title">
          {`You currently have no products :(`}
        </div>

        <NavLink
          to={`/products/create`}
          className="manage-product-title manage-products-link"
        >{`Add your first product!`}</NavLink>
      </>
    );
  }

  return (
    <>
      <div className="manage-page">
        <div className="manage-product-title">Manage Products</div>

        <div className="products">
          {userProductsArr.map((product) => (
            <div key={product.id}>
              <div className="product">
                <NavLink to={`/products/${product.id}`}>
                  <img src={product.previewImage} />
                  <div className="product-name">{product.name}</div>
                </NavLink>
              </div>
              <div className="update-delete">
                <NavLink to={`/products/${product.id}/edit`}>
                  <button className="product-update-button">Update</button>
                </NavLink>

                <div className="product-delete-button">
                  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteProductModal product={product} />}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ManageProducts;
