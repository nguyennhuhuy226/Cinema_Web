import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getSeat } from "../../../api/apiSeat";
import "./selectedSeat.css";

const SelectedSeat = () => {
  const { id } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchSeat = async () => {
      const data = await getSeat(id);
      const seats = data.result;
      setSeats(seats);
      console.log(data.result);
    };

    fetchSeat();
  }, [id]);

  const handleSeatClick = (seat) => {
    if (seat.booked) return;

    setSelectedSeats((prev) => {
      const isSelected = prev.find((s) => s.id === seat.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        return [...prev, seat];
      }
    });
  };

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  }, [selectedSeats]);

  const getSeatClassName = (seat) => {
    const baseClasses = ["seat-button"];

    // Thêm class dựa vào loại ghế (đơn/đôi)
    baseClasses.push(
      seat.seatType === "Couple" ? "seat-couple" : "seat-single"
    );

    // Thêm class dựa vào trạng thái ghế
    if (seat.booked) {
      baseClasses.push("seat-booked");
    } else if (selectedSeats.find((s) => s.id === seat.id)) {
      baseClasses.push("seat-selected");
    } else if (seat.seatType === "Couple") {
      baseClasses.push("seat-couple");
    } else if (seat.seatType === "VIP") {
      baseClasses.push("seat-vip");
    } else {
      baseClasses.push("seat-standard");
    }

    return baseClasses.join(" ");
  };

  return (
    <div className="container row seat-container">
      <div className="col-xl-7">
        {/* Screen */}
        <div className="screen">
          <div className="screen-display">Screen</div>
        </div>

        {/* Seats Grid */}
        <div className="seats-grid">
          {seats.map((seat) => (
            <button
              key={seat.id}
              onClick={() => handleSeatClick(seat)}
              disabled={seat.booked}
              className={getSeatClassName(seat)}
            >
              <span className="seat-name">{seat.name}</span>
              <span className="seat-price">${seat.price}</span>
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="seat-legend">
          <div className="legend-item">
            <div className="legend-color seat-standard"></div>
            <span>Standard</span>
          </div>
          <div className="legend-item">
            <div className="legend-color seat-vip"></div>
            <span>VIP</span>
          </div>
          <div className="legend-item">
            <div className="legend-color seat-couple"></div>
            <span>Couple VIP</span>
          </div>
          <div className="legend-item">
            <div className="legend-color seat-booked"></div>
            <span>Booked</span>
          </div>
          <div className="legend-item">
            <div className="legend-color seat-selected"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>

      <div className="col-xl-5">
        {/* Selected Seats Summary */}
        <div className="summary-container">
          <div className="summary-content">
            <div>
              <h3 className="font-medium">Selected Seats:</h3>
              <p className="text-sm">
                {selectedSeats.length > 0
                  ? selectedSeats.map((seat) => seat.name).join(", ")
                  : "No seats selected"}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">Total Price:</p>
              <p className="text-lg font-bold">${totalPrice}</p>
            </div>
          </div>
          <button
            className="book-button"
            disabled={selectedSeats.length === 0}
            onClick={() => {
              console.log("Booking seats:", selectedSeats);
            }}
          >
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedSeat;
