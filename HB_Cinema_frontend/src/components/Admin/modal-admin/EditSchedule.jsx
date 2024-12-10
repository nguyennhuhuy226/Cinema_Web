import React, { useState, useEffect } from "react";
import "./modal.css";

const EditSchedule = ({
  isOpen,
  onClose,
  schedule,
  onUpdateSchedule,
}) => {
  const [updatedSchedule, setUpdatedSchedule] = useState({
    movieId: "",
    branchId: "",
    roomId: "",
    startDateTime: "",
  });

  // Update local state when schedule prop changes
  useEffect(() => {
    if (schedule) {
      setUpdatedSchedule({
        movieId: schedule.movieId || "",
        branchId: schedule.branchId || "",
        roomId: schedule.roomId || "",
        startDateTime: schedule.startDateTime
          ? new Date(schedule.startDateTime).toISOString().slice(0, 16)
          : "",
      });
    }
  }, [schedule]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateSchedule(updatedSchedule);
  };

  if (!isOpen || !schedule) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
      <h2 className="modal-header">Update Schedule</h2>
        <form className="grid-cols-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Movie ID"
            value={updatedSchedule.movieId}
            onChange={(e) =>
              setUpdatedSchedule({
                ...updatedSchedule,
                movieId: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Enter Branch ID"
            value={updatedSchedule.branchId}
            onChange={(e) =>
              setUpdatedSchedule({
                ...updatedSchedule,
                branchId: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Enter Room ID"
            value={updatedSchedule.roomId}
            onChange={(e) =>
              setUpdatedSchedule({ ...updatedSchedule, roomId: e.target.value })
            }
            required
          />

          <input
            type="datetime-local"
            value={updatedSchedule.startDateTime}
            onChange={(e) =>
              setUpdatedSchedule({
                ...updatedSchedule,
                startDateTime: e.target.value,
              })
            }
            required
          />

          <div className="modal-actions-schedule">
          <button type="button" className="button-base-schedule button-cancel" onClick={onClose}>
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

export default EditSchedule;
