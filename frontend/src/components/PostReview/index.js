import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createReviewThunk, getReviewsThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { loadProductsThunk } from "../../store/products";

function PostReview({ user, singleProduct }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [disabled, setDisabled] = useState(false);
  const [activeRating, setActiveRating] = useState(rating);

  const onChange = (number) => {
    setRating(parseInt(number));
  };

  useEffect(() => {
    const errors = {};

    if (!comment) errors.comment = "Review is required";
    if (comment && comment.length < 10)
      errors.comment = "Review must be more than 10 characters";
    if (!activeRating) errors.rating = "Star rating is required";

    setValidationErrors(errors);
  }, [comment, activeRating]);

  const submitReview = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const newReview = {
      userId: user.id,
      productId: singleProduct.id,
      review: comment,
      stars: rating,
    };

    if (Object.keys(validationErrors).length === 0) {
      const response = await dispatch(
        createReviewThunk(newReview, singleProduct.id)
      );

      dispatch(getReviewsThunk(singleProduct.id));
      await dispatch(loadProductsThunk());

      closeModal();

      setComment("");
      setRating(0);
      setHasSubmitted(false);
      return null;
    }
  };

  return (
    <div className="review-modal">
      <h2>Leave a review!</h2>
      <form onSubmit={submitReview}>
        {hasSubmitted && validationErrors.comment && (
          <div className="error">{validationErrors.comment}</div>
        )}
        <textarea
          className="post-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave your review here..."
        />
        <label>
          <div className="rating-input">
            <div
              className={activeRating >= 1 ? "filled" : "empty"}
              onMouseEnter={() => {
                if (!disabled) setActiveRating(1);
              }}
              onMouseLeave={() => {
                if (!disabled) setActiveRating(rating);
              }}
              onClick={() => {
                if (!disabled) onChange(1);
              }}
            >
              <i className="fa fa-star"></i>
            </div>
            <div
              className={activeRating >= 2 ? "filled" : "empty"}
              onMouseEnter={() => {
                if (!disabled) setActiveRating(2);
              }}
              onMouseLeave={() => {
                if (!disabled) setActiveRating(rating);
              }}
              onClick={() => {
                if (!disabled) onChange(2);
              }}
            >
              <i className="fa fa-star"></i>
            </div>
            <div
              className={activeRating >= 3 ? "filled" : "empty"}
              onMouseEnter={() => {
                if (!disabled) setActiveRating(3);
              }}
              onMouseLeave={() => {
                if (!disabled) setActiveRating(rating);
              }}
              onClick={() => {
                if (!disabled) onChange(3);
              }}
            >
              <i className="fa fa-star"></i>
            </div>
            <div
              className={activeRating >= 4 ? "filled" : "empty"}
              onMouseEnter={() => {
                if (!disabled) setActiveRating(4);
              }}
              onMouseLeave={() => {
                if (!disabled) setActiveRating(rating);
              }}
              onClick={() => {
                if (!disabled) onChange(4);
              }}
            >
              <i className="fa fa-star"></i>
            </div>
            <div
              className={activeRating >= 5 ? "filled" : "empty"}
              onMouseEnter={() => {
                if (!disabled) setActiveRating(5);
              }}
              onMouseLeave={() => {
                if (!disabled) setActiveRating(rating);
              }}
              onClick={() => {
                if (!disabled) onChange(5);
              }}
            >
              <i className="fa fa-star"></i>
            </div>
            Stars
          </div>
        </label>
        {hasSubmitted && validationErrors.rating && (
          <div className="error">{validationErrors.rating}</div>
        )}
        <button
          className="submit-review"
          type="submit"
          // disabled={comment.length < 10 || rating === 0}
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
}

export default PostReview;
