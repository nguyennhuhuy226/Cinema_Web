import React from "react";
import "./my-ticket.css";

const Ticket = ({ ticket }) => {
  return (
    <div className="ticket-list">
      {ticket.map((ticket) => {
        const { id, qrImageURL, seatName, scheduleDetails = {} } = ticket;

        const {
          startDateTime,
          movie = {},
          branch = {},
          room = {},
        } = scheduleDetails;

        const formattedDate = new Date(startDateTime).toLocaleDateString(
          "en-EN",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );

        const formattedTime = new Date(startDateTime).toLocaleTimeString(
          "en-EN",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );

        return (
          <div key={id} className="ticket-container">
            <h2 className="movie-ticket-title">
              {movie.title}
            </h2>
            <div className="ticket-left">
              <p className="movie-ticket-info">{formattedDate}</p>
              <p className="movie-ticket-info">
                Time: <strong>{formattedTime}</strong>
              </p>
              <p className="movie-ticket-info">
                Seat: <strong>{seatName}</strong>
              </p>
              <p className="movie-ticket-info">
                Room: <strong>{room.name}</strong> | Branch:{" "}
                <strong>{branch.name}</strong>
              </p>
            </div>
            <div className="ticket-right">
              <img
                src={qrImageURL}
                alt={`QR Code for ticket ${id}`}
                className="qr-code"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Ticket;
