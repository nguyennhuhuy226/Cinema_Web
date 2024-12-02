import React, { useEffect, useState } from "react";
import Footer from "../../components/User/footer/Footer";
import MovieSchedule from "../../components/User/movie-schedule/MovieSchedule";
import MovieDetail from "../../components/User/movie-details/MovieDetail";
import MovieCard from "../../components/User/movie-card/MovieCard";
import { getAllMovie } from "../../api/apiMovie";
import Blog from "../../components/User/blog/Blog";

const MovieDetailPage = () => {

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
        <div className="col-xl-8"><MovieSchedule /><Blog /></div>
        <div className="col-xl-4"><MovieCard movie={movie}/></div>
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetailPage;
