import { useEffect, useState } from "react";
// import { deleteOneSpot } from "../../store/spots";
import {
  getReviews,
  getReviewsThunk,
  removeOneReview,
  removeReviewThunk,
} from "../../store/reviews";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { loadProductsThunk } from "../../store/products";

function DeleteReviewButton({ review, singleProduct }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [exists, setExists] = useState(true);

  useEffect(() => {
    dispatch(getReviewsThunk(singleProduct.id));
  }, [dispatch, singleProduct]);

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(removeReviewThunk(review.id)).then(closeModal);
    setExists(false);
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    closeModal();
  };

  dispatch(loadProductsThunk(singleProduct.id));

  return (
    <>
      {exists && (
        <>
          <div className="delete-modal">
            <h2>Confirm Delete</h2>
            <div>Are you sure you want to delete this review?</div>
            <button className="yes-delete" onClick={confirmDelete}>
              Delete
            </button>
            <button className="no-delete" onClick={cancelDelete}>
              Cancel
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default DeleteReviewButton;
