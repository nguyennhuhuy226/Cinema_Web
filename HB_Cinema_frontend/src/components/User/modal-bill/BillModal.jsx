import React from "react";
import { useNavigate } from "react-router-dom";
import "./bill-modal.css";
import { FaArrowRightLong } from "react-icons/fa6";

const BillModal = ({ bill, onClose }) => {
  const navigate = useNavigate();
  if (!bill) return null;

  const { totalPrice, totalAmount, tickets, combos } = bill;
  const goProfile = () => {
    navigate("/profile"); 
  };

  return (
    <div className="bill-modal-overlay">
      <div className="bill-modal">
        <button className="bill-button-right" onClick={goProfile}>
          <FaArrowRightLong />
        </button>
        <div className="bill-content">
          {/* Left Section */}
          <div className="bill-left">
            <h2 className="bill-movie-title">
              {tickets[0].scheduleDetails.movie.title}
            </h2>
            <div className="bill-info">
              <div className="row">
                <p className="col-auto">
                  Time
                  <br />
                  <strong>
                    {new Date(
                      tickets[0].scheduleDetails.startDateTime
                    ).toLocaleTimeString()}
                  </strong>
                </p>
                <p className="col-auto">
                  Date
                  <br />
                  <strong>
                    {new Date(
                      tickets[0].scheduleDetails.startDateTime
                    ).toLocaleDateString()}
                  </strong>
                </p>
              </div>
              <div className="row">
                <p className="col-auto">
                  Theater
                  <br />
                  <strong>{tickets[0].scheduleDetails.branch.name}</strong><br/>
                  {tickets[0].scheduleDetails.branch.address}
                  <br />
                </p>
                <p className="col-auto">
                  Room
                  <br />
                  <strong>{tickets[0].scheduleDetails.room.name}</strong>
                </p>
              </div>
              
              <div className="row">
                <p className="col-auto">
                  Seat
                  <br />
                  <strong>
                    {tickets.map((ticket) => ticket.seatName).join(", ")}
                  </strong>
                </p>
                <p className="col-auto">
                  <br />
                  <strong>{totalPrice.toLocaleString()}$</strong>
                </p>
              </div>
            </div>
            <div className="combo-info">
              Combo
              {combos.map((combo, index) => (
                <p key={index} className="combo-row">
                  <strong>{combo.name}</strong>
                  <strong>{combo.price.toLocaleString()}$</strong>
                </p>
              ))}
            </div>
            <div className="row total-row">
              <p className="total-label col-auto">
                <strong>Total Price</strong>
              </p>
              <p className="col-auto">
                <strong>{totalAmount.toLocaleString()}$</strong>
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="bill-right">
            <img
              src={tickets[0].qrImageURL}
              alt="QR Code"
              className="bill-qr-text"
            />
            <p className="qr-text">Scan QR code to pay</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillModal;
