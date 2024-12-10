import React, { useState } from "react";
import "./top-movie.css";
import YouTubeModal from "../youtube-modal/YouTubeModal";

const TopMovie = ({ movie }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState(""); // State để lưu URL video

  const handleOpenModal = (url) => {
    setVideoUrl(url); // Cập nhật videoUrl khi mở modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const moviesPerPage = 7; // Số lượng phim hiển thị trên một trang

  // Sắp xếp phim theo rating giảm dần
  const sortedMovies = [...movie].sort((a, b) => b.rating - a.rating);

  // Tính toán phim hiển thị trong trang hiện tại
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = sortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Chuyển trang
  const totalPages = Math.ceil(movie.length / moviesPerPage);
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="top-movie-list">
    {/* Thêm tiêu đề Top Rating */}
    <h1 className="top-movie-heading">Top rated movies</h1>
    
    {currentMovies.map((movie) => (
      <div className="top-movie-card" key={movie.id}>
        {/* Rating ở góc phải */}
        <div className="top-movie-rating">{movie.rating.toFixed(1)}</div>
        <img src={movie.image} alt={movie.title} className="top-movie-image" />
        <div className="top-movie-info">
          <h2 className="top-movie-title">{movie.title}</h2>
          <p className="top-movie-duration">
            ⏱ {Math.floor(movie.duration / 60)} hours {movie.duration % 60} minutes
          </p>
          <p className="top-movie-overview">{movie.overView}</p>
          <p>
            <strong>Language:</strong> {movie.language}
          </p>
          <p>
            <strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}
          </p>
          <a onClick={() => handleOpenModal(movie.trailer)}
            href={movie.trailer}
            target="_blank"
            rel="noopener noreferrer"
            className="top-movie-trailer"
          >
            Watch Trailer
          </a>
        </div>
      </div>
    ))}
    <div className="top-movie-pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="top-movie-page-button"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`top-movie-page-button ${
            currentPage === index + 1 ? "top-movie-page-active" : ""
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="top-movie-page-button"
      >
        Next
      </button>
    </div>
    <YouTubeModal
        videoUrl={videoUrl}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
  </div>
  );
};

export default TopMovie;
