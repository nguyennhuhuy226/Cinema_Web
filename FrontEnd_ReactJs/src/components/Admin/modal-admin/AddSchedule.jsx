import React, { useState } from "react";
import "./modal.css";

const AddSchedule = ({ isOpen, onClose, onAddSchedule }) => {
  const [newSchedule, setNewSchedule] = useState({
    movieId: "",
    branchId: "",
    roomId: "",
    startDateTime: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSchedule(newSchedule);
    // Reset form after submission
    setNewSchedule({
      movieId: "",
      branchId: "",
      roomId: "",
      startDateTime: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-header">Add New Schedule</h2>
        <form className="grid-cols-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Movie ID"
            value={newSchedule.movieId}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, movieId: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Enter Branch ID"
            value={newSchedule.branchId}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, branchId: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Enter Room ID"
            value={newSchedule.roomId}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, roomId: e.target.value })
            }
            required
          />

          <input
            type="datetime-local"
            value={newSchedule.startDateTime}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, startDateTime: e.target.value })
            }
            required
          />

          <div className="modal-actions-schedule">
            <button
              type="button"
              className="button-base-schedule button-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="button-base-schedule button-save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchedule;
