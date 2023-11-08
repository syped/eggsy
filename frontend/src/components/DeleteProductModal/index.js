import { useState } from "react";
import { deleteProductThunk } from "../../store/products";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function DeleteButton({ product }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [exists, setExists] = useState(true);

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deleteProductThunk(product.id)).then(closeModal);
    setExists(false);
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <>
      {exists && (
        <>
          <div className="delete-modal">
            <h2 className="delete-product">Confirm Delete</h2>
            <div>Are you sure you want to remove this product?</div>
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

export default DeleteButton;
