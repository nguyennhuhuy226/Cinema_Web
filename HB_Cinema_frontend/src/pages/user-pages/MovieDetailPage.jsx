import React from "react";

import MovieSchedule from "../../components/User/movie-schedule/MovieSchedule";
import MovieDetail from "../../components/User/movie-details/MovieDetail";



const MovieDetailPage = () => {
  return (
    
      <div>
        <div>
        <MovieDetail />
        <MovieSchedule />
      </div>
      </div>
    
   
  );
};

export default MovieDetailPage;
