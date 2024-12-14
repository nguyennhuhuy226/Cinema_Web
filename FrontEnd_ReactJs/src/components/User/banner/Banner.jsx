import React from "react";
import './banner.css'
import IconRating from "../../../assets/images/rating.png";
import IconRatingHalf from "../../../assets/images/rating-half.png";
import ImgTemp from "../../../assets/images/venom.png";
import Iconplay from "../../../assets/images/play-button.png";
import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-overlay" />
      <div className="banner-content">
        <div className="banner-text-section">
          <div>
            <h1 className="banner-title">Venom: The Last Dance</h1>
            <div className="banner-ratings">
              <img src={IconRating} alt="rating" className="h-8 w-8" />
              <img src={IconRating} alt="rating" className="h-8 w-8" />
              <img src={IconRating} alt="rating" className="h-8 w-8" />
              <img src={IconRating} alt="rating" className="h-8 w-8" />
              <img src={IconRatingHalf} alt="rating" className="h-8 w-8" />
            </div>
            <p className="banner-description">
              Eddie and Venom are caught in a multi-web in the follow-up to 2021’s Venom: Let There Be Carnage. The God of Symbiotes, Knull, seeks a mysterious artefact called Codex (which Venom holds) to destroy the universe. Eddie, framed for the murder of Detective Patrick Mulligan (Stephen Graham), is on the run from the police. General Strickland (Chiwetel Ejiofor) is after them to destroy Venom before Knull can lay his hands on Codex. Scientists are pursuing the two for their own agenda.
            </p>
            <div className="banner-buttons">
              <NavLink to="/movies/2"><button className="button-details">Details</button></NavLink>
              <NavLink to="/movies/2"><button className="button-buy">Ticket</button></NavLink>

            </div>
          </div>
        </div>
        <div className="banner-image-section">
          <div className="banner-image-container">
            <img src={ImgTemp} alt="temp" className="banner-image" />
            <div className="banner-image-overlay">
              <img src={Iconplay} alt="play" className="play-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
