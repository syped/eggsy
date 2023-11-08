import { csrfFetch } from "./csrf";

const LOAD_ALL_REVIEWS = "reviews/loadAllReviews";
const POST_REVIEW = "review/postReview";
const DELETE_REVIEW = "review/deleteReview";

const loadAllReviews = (reviews) => {
  return {
    type: LOAD_ALL_REVIEWS,
    reviews,
  };
};

const postReview = (review) => {
  return {
    type: POST_REVIEW,
    review,
  };
};

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

export const getReviewsThunk = (productId) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/${productId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadAllReviews(reviews));
    return reviews;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createReviewThunk = (review, productId) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/${productId}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const newReview = await response.json();
    dispatch(postReview(newReview));
    return newReview;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const removeReviewThunk = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteReview(reviewId));
  } else {
    const errors = response.json();
    return errors;
  }
};

const initialState = {
  product: {},
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_REVIEWS:
      return {
        ...state,
        product: action.reviews,
      };
    case POST_REVIEW:
      return {
        ...state,
        product: { Reviews: [...state.product.Reviews, action.review] },
      };
    case DELETE_REVIEW:
      const reviewsArr = [...state.product.Reviews];
      delete reviewsArr[action.reviewId];
      return {
        ...state,
        product: { Reviews: reviewsArr },
      };
    default:
      return state;
  }
};

export default reviewsReducer;
