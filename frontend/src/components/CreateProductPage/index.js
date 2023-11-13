import { useSelector, useDispatch } from "react-redux";
import {
  createProductImagesThunk,
  createProductThunk,
  loadProductsThunk,
} from "../../store/products";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

function CreateProductPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  //   const user = useSelector((state) => state.session.user);
  //   const allProducts = useSelector(
  //     (state) => state.product.allProducts.Products
  //   );

  //   if (!allProducts || !allProducts.length) {
  //     dispatch(loadProductsThunk());
  //     return null;
  //   }

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [images, setImages] = useState(["", "", "", ""]);
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const updateImages = (value, index) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  useEffect(() => {
    const errors = {};

    if (!name) errors.name = "Product name is required";
    if (name.length > 50) errors.name = "Name must be less than 50 characters";
    if (!category) errors.category = "Please select a category";
    if (description.length < 30)
      errors.description = "Description must be atleast 30 characters";
    if (!price) errors.price = "Price of product is required";
    if (!previewImage) errors.previewImage = "Preview image is required";

    setValidationErrors(errors);
  }, [name, category, description, price, previewImage, images]);

  const submitProduct = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const newProduct = {
      name,
      category,
      description,
      price,
    };

    const newPreviewImage = {
      url: previewImage,
      preview: true,
    };

    if (Object.keys(validationErrors).length === 0) {
      const response = await dispatch(createProductThunk(newProduct));

      if (response) {
        await dispatch(createProductImagesThunk(newPreviewImage, response.id));

        for (let i = 0; i < images.length; i++) {
          const image = images[i];

          const newImage = {
            url: image,
            preview: false,
          };

          if (image) {
            await dispatch(createProductImagesThunk(newImage, response.id));
          }
        }

        history.push(`/products/${response.id}`);
        setName("");
        setCategory("");
        setDescription("");
        setPrice("");
        setPreviewImage("");
        setImages(["", "", "", ""]);
        setHasSubmitted(false);
      }
    }
  };

  return (
    <>
      <div className="create-product">
        <h2 className="create-listing">Create a Listing</h2>
        <form onSubmit={submitProduct}>
          <div className="preview-image-header">Preview Image</div>
          <div className="section-1">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPreviewImage(e.target.files[0])}
            />
            {hasSubmitted && validationErrors.previewImage && (
              <div className="error">{validationErrors.previewImage}</div>
            )}
            {images.map((url, index) => (
              <input
                key={index}
                type="file"
                accept="image/*"
                onChange={(e) => updateImages(e.target.files[0], index)}
              />
            ))}
            {hasSubmitted && validationErrors.image && (
              <div className="error">{validationErrors.image}</div>
            )}
          </div>
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
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="" disabled selected>
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

export default CreateProductPage;
