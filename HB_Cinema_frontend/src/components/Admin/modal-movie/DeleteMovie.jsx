import React from "react";

const DeleteMovie = ({ onClose, onConfirm }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 w-96">
      <h2 className="text-xl font-semibold mb-4">Delete Movie</h2>
      <p>Are you sure you want to delete this movie?</p>
      <div className="flex justify-end space-x-2 mt-4">
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
          Cancel
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DeleteMovie;
