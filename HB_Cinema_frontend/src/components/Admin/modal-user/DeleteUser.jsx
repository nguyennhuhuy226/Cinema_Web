import './modal.css'; // Import CSS file

const DeleteUser = ({ onClose, onConfirm }) => (
  <div className="modal-overlay">
    <div className="modal-container">
      <h2 className="modal-header">Delete User</h2>
      <p>Are you sure you want to delete this user?</p>
      <div className="flex justify-end mt-4 space-x-2">
        <button className="button-cancel" onClick={onClose}>
          Cancel
        </button>
        <button
          className="button-delete"
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DeleteUser;
