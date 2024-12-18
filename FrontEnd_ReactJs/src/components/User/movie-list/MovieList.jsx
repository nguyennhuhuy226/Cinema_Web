import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./movielist.css";
import { FaStar } from "react-icons/fa";
import { MovieContext } from "../../../context/MovieProvider";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktopMax: {
    breakpoint: { max: 3000, min: 1250 },
    items: 6,
  },
  DesktopAccessDisabledSharp: {
    breakpoint: { max: 1250, min: 1200 },
    items: 5,
  },
  desktopMin: {
    breakpoint: { max: 1200, min: 980 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 980, min: 765 },
    items: 3,
  },
  tabletMin: {
    breakpoint: { max: 765, min: 560 },
    items: 2,
  },
  mobileMin: {
    breakpoint: { max: 560, min: 0 },
    items: 1,
  },
};

const MovieList = ({ title, data, onMovieClick }) => {
  const { handleTrailer } = useContext(MovieContext);

  return (
    <div className="containe pl-20 pr-20 pt-10 pb-10">
      <h2 className="title">{title}</h2>
      <Carousel responsive={responsive} className="carousel">
        {data &&
          data.length > 0 &&
          data.map((movie) => (
            <div key={movie.id} className="card">
              <div
                className="card-image-wrapper"
                onClick={() => handleTrailer(movie.trailer)}
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="card-image"
                />
              </div>
              <div
                className="card-title"
                onClick={() => onMovieClick(movie.id)}
              >
                <p>{movie.title}</p>
                <div className="rating">
                  <FaStar />
                  <span>{movie.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};
MovieList.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  onMovieClick: PropTypes.func.isRequired,
};
export default MovieList;
