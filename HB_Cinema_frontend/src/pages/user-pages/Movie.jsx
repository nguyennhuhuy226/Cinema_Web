import React, { useEffect, useState } from "react";
import Footer from "../../components/User/footer/Footer";
import MovieDetail from "../../components/User/movie-details/MovieDetail";
import MovieCard from "../../components/User/movie-card/MovieCard";
import { getAllMovie } from "../../api/apiMovie";
import MovieGrid from "../../components/User/movie-grid/MovieGrid";

const Movie = () => {

  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllMovie();
  },[]);

  const fetchAllMovie = async () => {
    try {
      const data = await getAllMovie();
      setMovie(data.result);
      console.log(data.result);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
        <MovieDetail />
      <div className="row">
        <div className="col-xl-8"><MovieGrid movies={movie}/></div>
        <div className="col-xl-4"><MovieCard title={"Now watching"} movie={movie}/></div>
      </div>
    
      <div><Footer /></div>
    </div>
  );
};

export default Movie;
