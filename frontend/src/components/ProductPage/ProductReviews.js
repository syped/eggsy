import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsThunk } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import PostReview from "../PostReview";
import DeleteReview from "../DeleteReview";
import { loadSingleProductThunk } from "../../store/products";

function SpotReviews({ singleProduct }) {
  const dispatch = useDispatch();

  const productReviews = useSelector((state) => state.review.product.Reviews);
  const sessionUser = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.product.singleProduct);

  useEffect(() => {
    dispatch(loadSingleProductThunk(singleProduct.id));
    dispatch(getReviewsThunk(singleProduct.id));
  }, [dispatch, singleProduct]);

  if (!productReviews) {
    return null;
  }

  if (!sessionUser) {
    return productReviews.map((review) => (
      <div key={review.id} className="one-review">
        <div className="review-firstName">{review?.User?.firstName}</div>
        <div className="review-date">
          {new Date(review.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })}
        </div>
        <div className="review-comment">{review.review}</div>
      </div>
    ));
  }

  const userReview = productReviews.find(
    (review) => review.userId === sessionUser.id
  );

  if (!productReviews.length) {
    return (
      <>
        {sessionUser &&
          !userReview &&
          singleProduct.User.id !== sessionUser.id && (
            <div className="post-review-button">
              <OpenModalButton
                buttonText="Post Your Review"
                modalComponent={
                  <PostReview
                    user={sessionUser}
                    singleProduct={singleProduct}
                  />
                }
              />
            </div>
          )}
        <div className="review-section">
          {productReviews.length === 0 &&
            sessionUser !== null &&
            sessionUser.id !== singleProduct.User.id && (
              <div>Be the first to post a review!</div>
            )}
        </div>
      </>
    );
  }

  return (
    <>
      {productReviews
        .map((review) => (
          <div key={review.id} className="one-review">
            <div className="review-firstName">{review?.User?.firstName}</div>
            <div className="review-date">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </div>
            <div className="review-comment">{review.review}</div>
            {sessionUser.id === review?.User?.id ? (
              <div className="delete-review-button">
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={
                    <DeleteReview
                      review={review}
                      singleProduct={singleProduct}
                    />
                  }
                />
              </div>
            ) : null}
          </div>
        ))
        .reverse()}
    </>
  );
}

export default SpotReviews;
