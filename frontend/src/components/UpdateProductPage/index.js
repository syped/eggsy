import { useSelector, useDispatch } from "react-redux";
import {
  loadProductsThunk,
  loadSingleProductThunk,
  updateProductThunk,
} from "../../store/products";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function UpdateProductPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();

  const product = useSelector((state) => state.product.singleProduct);
  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(loadSingleProductThunk(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    setName(product.name || "");
    setCategory(product.category || "");
    setDescription(product.description || "");
    setPrice(product.price || "");
  }, [product]);

  useEffect(() => {
    setCategory(product.category || "");
  }, [product.category]);

  if (!user) {
    return <Redirect to="/"></Redirect>;
  }

  const submitProduct = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const errors = {};

    if (!name) errors.name = "Product name is required";
    if (name.length > 50) errors.name = "Name must be less than 50 characters";
    if (!category) errors.category = "Please select a category";
    if (description.length < 30)
      errors.description = "Description must be atleast 30 characters";
    if (!price) errors.price = "Price of product is required";

    setValidationErrors(errors);

    const updatedProduct = {
      id: product.id,
      name,
      category,
      description,
      price,
    };

    if (Object.keys(validationErrors).length === 0) {
      const response = await dispatch(updateProductThunk(updatedProduct));
      await dispatch(loadProductsThunk());

      if (response) {
        history.push(`/products/${response.id}`);
        setName("");
        setCategory("");
        setDescription("");
        setPrice("");
        setHasSubmitted(false);
      }
    }
  };

  return (
    <>
      <div className="create-product">
        <h2 className="create-listing">Update Listing</h2>
        <form onSubmit={submitProduct}>
          <div className="section-2">
            <label className="input-name">
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </label>
            {hasSubmitted && validationErrors.name && (
              <div className="error">{validationErrors.name}</div>
            )}

            <label className="input-price">
              Price
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
              />
            </label>
            {hasSubmitted && validationErrors.price && (
              <div className="error">{validationErrors.price}</div>
            )}

            <label className="input-category">
              Category
              <select
                defaultValue={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="mouse">Gaming Mouse</option>
                <option value="keyboard">Gaming Keyboard</option>
                <option value="headset">Gaming Headset</option>
                <option value="monitor">Gaming Monitor</option>
              </select>
            </label>
            {hasSubmitted && validationErrors.category && (
              <div className="error">{validationErrors.category}</div>
            )}

            <label className="input-description">
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            {hasSubmitted && validationErrors.description && (
              <div className="error">{validationErrors.description}</div>
            )}
          </div>
          <button className="create-product-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateProductPage;
