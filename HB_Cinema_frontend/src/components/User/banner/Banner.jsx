import React from "react";
import './banner.css'
import IconRating from "../../../assets/images/rating.png";
import IconRatingHalf from "../../../assets/images/rating-half.png";
import ImgTemp from "../../../assets/images/venom.png";
import Iconplay from "../../../assets/images/play-button.png";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-overlay" />
      <div className="banner-content">
        <div className="banner-text-section">
          <div>
            <h1 className="banner-title">Venom: Kèo cuối</h1>
            <div className="banner-ratings">
              <img src={IconRating} alt="rating" className="h-8 w-8" />
              <img src={IconRating} alt="rating" className="h-8 w-8" />
              <img src={IconRating} alt="rating" className="h-8 w-8" />
              <img src={IconRating} alt="rating" className="h-8 w-8" />
              <img src={IconRatingHalf} alt="rating" className="h-8 w-8" />
            </div>
            <p className="banner-description">
              Trong video này, bạn sẽ khám phá những kiến thức cơ bản về ReactJS 🚀
              Được thiết kế đặc biệt cho người mới bắt đầu, khóa học này sẽ giúp
              bạn hiểu cách ReactJS hoạt động và làm thế nào để xây dựng các ứng
              dụng web tương tác. 🚀 Link Source Code:
              https://github.com/minhnhut170701/mov... Nội Dung Chính:
            </p>
            <div className="banner-buttons">
              <button className="button-details">Details</button>
              <button className="button-buy">Ticket</button>
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
