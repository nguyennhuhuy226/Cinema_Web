import { useState } from "react";
import './modal.css';

const EditSeat = ({ title, seat, onClose, onSave }) => {
  const [formData, setFormData] = useState(seat);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(seat)

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-header">{title}</h2>
        <div className="grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Seat Name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="price"
            placeholder="Price Seat"
            value={formData.price}
            onChange={handleChange}
            className="input-field"
          />
          {/* <input
            type=""
            name="type"
            placeholder="Price Seat"
            value={formData.seatType}
            onChange={handleChange}
            className="input-field"
          /> */}
        </div>
        <div className="modal-actions">
          <button className="button-base button-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="button-base button-save"
            onClick={() => onSave(formData)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSeat;