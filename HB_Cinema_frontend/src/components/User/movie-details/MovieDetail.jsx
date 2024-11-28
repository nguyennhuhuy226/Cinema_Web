import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../../api/apiMovie";
import {
  FaStar,
  FaLanguage,
  FaCalendarAlt,
  FaClock,
  FaPlayCircle,
} from "react-icons/fa";
import "./moviedetail.css";
import poster from "../../../assets/images/poster.png";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetail();
  }, [id]);

  const fetchMovieDetail = async () => {
    try {
      const data = await getMovieById(id);
      setMovie(data.result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!movie) {
    return <div className="error-message">Movie information not found.</div>;
  }

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-wrapper">
        <div className="movie-detail-image">
          <img className="movie-poster" src={movie.image} alt={movie.title} />
        </div>
        <div className="movie-detail-content">
          <h1 className="movie-title">{movie.title}</h1>
          <div className="movie-info-grid">
            <div className="movie-info-item">
              <FaCalendarAlt className="movie-info-icon" />
              <span>
                Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
              </span>
            </div>
            <div className="movie-info-item">
              <FaLanguage className="movie-info-icon" />
              <span>Language: {movie.language}</span>
            </div>
            <div className="movie-info-item">
              <FaStar className="movie-info-icon" />
              <span className="movie-rating">{movie.rating}</span>
            </div>
            <div className="movie-info-item">
              <FaClock className="movie-info-icon" />
              <span>Duration: {movie.duration} mins</span>
            </div>
          </div>
          <div className="movie-overview">
            <h2 className="overview-title">Overview</h2>
            <p>{movie.overView}</p>
          </div>
          <div className="movie-actions">
            <a
              href={movie.trailer}
              className="trailer-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPlayCircle className="trailer-icon" />
              Watch Trailer
            </a>
          </div>
        </div>
        <div className="movie-advertisement">
          <h3 className="ad-title">30% Off Movie Tickets This Week!</h3>
          <img
            src={poster}
            alt="advertisement"
            className="advertisement-image"
          />
          <a href="/book-tickets" className="ad-button">
            Book Tickets
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
