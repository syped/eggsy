import { csrfFetch } from "./csrf";

const LOAD_ALL_PRODUCTS = "products/loadAllProducts";
const LOAD_SINGLE_PRODUCT = "products/loadSingleProduct";
const CREATE_PRODUCT = "products/createProduct";
const CREATE_PRODUCT_IMAGES = "products/createProductImages";
const UPDATE_PRODUCT = "products/updateProduct";
const DELETE_PRODUCT = "products/deleteProduct";

const loadAllProducts = (products) => {
  return {
    type: LOAD_ALL_PRODUCTS,
    products,
  };
};

const loadSingleProduct = (product) => {
  return {
    type: LOAD_SINGLE_PRODUCT,
    product,
  };
};

const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product,
  };
};

const createProductImages = (product) => {
  return {
    type: CREATE_PRODUCT_IMAGES,
    product,
  };
};

const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
};

const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    productId,
  };
};

export const loadProductsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/products");

  if (response.ok) {
    const products = await response.json();
    dispatch(loadAllProducts(products));
    return products;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const loadSingleProductThunk = (productId) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/${productId}`);

  if (response.ok) {
    const product = await response.json();
    dispatch(loadSingleProduct(product));
    return product;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createProductThunk = (product) => async (dispatch) => {
  const response = await csrfFetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (response.ok) {
    const newProduct = await response.json();
    dispatch(createProduct(newProduct));
    return newProduct;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createProductImagesThunk =
  (image, productId) => async (dispatch) => {
    const { url, preview } = image;
    const formData = new FormData();
    formData.append("url", url);
    formData.append("preview", preview);

    const response = await csrfFetch(`/api/products/${productId}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (response.ok) {
      const newImage = await response.json();
      dispatch(createProductImages(newImage));
      return newImage;
    } else {
      const errors = await response.json();
      return errors;
    }
  };

export const updateProductThunk = (product) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/${product.id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });

  if (response.ok) {
    const updatedProduct = await response.json();
    dispatch(updateProduct(updatedProduct));
    return updatedProduct;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const deleteProductThunk = (productId) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/${productId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteProduct(productId));
  } else {
    const errors = response.json();
    return errors;
  }
};

const initialState = {
  allProducts: {},
  singleProduct: {},
};

const productReducer = (state = initialState, action) => {
  const newProducts = { ...state.allProducts.Products };
  switch (action.type) {
    case LOAD_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.products,
      };
    case LOAD_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.product,
      };
    case CREATE_PRODUCT:
      return { ...state, [action.product.id]: action.product };
    case UPDATE_PRODUCT:
      return { ...state, [action.product.id]: action.product };
    case DELETE_PRODUCT:
      const newState = { ...state };
      delete newState[action.productId];
      return newState;
    default:
      return state;
  }
};

export default productReducer;
