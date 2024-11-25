import React from "react";
import MovieDetail from "../components/User/movie-details/MovieDetail";
import Footer from "../components/User/footer/Footer";

const Movie = () => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <MovieDetail />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Movie;
