import React, { useState } from "react";

const AddMovie = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    releaseDate: "",
    duration: "",
    overView: "",
    rating: "",
    trailer: "",
    language: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Add New Movie</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
          <input
            type="datetime-local"
            name="releaseDate"
            placeholder="Release Date"
            value={formData.releaseDate}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
          <textarea
            name="overView"
            placeholder="Overview"
            value={formData.overView}
            onChange={handleChange}
            className="border w-full p-2 rounded col-span-2"
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
          <input
            type="text"
            name="trailer"
            placeholder="Trailer URL"
            value={formData.trailer}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
          <input
            type="text"
            name="language"
            placeholder="Language"
            value={formData.language}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => onSave(formData)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
