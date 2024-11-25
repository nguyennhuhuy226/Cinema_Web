import React, { useEffect, useState } from "react";
import "./moviedetail.css";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../../api/apiMovie";

const MovieDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchMovieDetail();
  }, [id]);

  const fetchMovieDetail = async () => {
    const data = await getMovieById(id);
    setMovie(data.result);
    console.log(data);
  };

  return (
    <div className="container">
      <div className="row movie-detail">
          {/* Hình ảnh */}
          <div className="col-md-5 movie-detail-image">
            <img src={movie.image} alt={movie.title} />
          </div>

          {/* Nội dung */}
          <div className="col-md-7 movie-detail-content">
            <h1 className="movie-title">{movie.title}</h1>
            <p className="movie-rating">⭐ {movie.rating}</p>
            <p className="movie-language">Ngôn ngữ: {movie.language}</p>
            <p className="movie-release-date">
              Ngày phát hành: {new Date(movie.releaseDate).toLocaleDateString()}
            </p>
            <p className="movie-duration">Thời lượng: {movie.duration} phút</p>
            <p className="movie-overview">{movie.overView}</p>
            <div className="movie-actions">
              <a
                href={movie.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Xem trailer
              </a>
            </div>
          </div>
        </div>
    </div>

  );
};

export default MovieDetail;
