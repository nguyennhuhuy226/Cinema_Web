import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/User/banner/Banner";
import MovieList from "../../components/User/movie-list/MovieList";
import Footer from "../../components/User/footer/Footer";
import { getMovies } from "../../api/apiMovie";


const Home = () => {
  const [movie, setMovie] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      const data = await getMovies();
    const movie = data.result;
    setMovie(movie);
    } catch (error) {
      console.log(error)
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/movies/${id}`);
  };
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Banner />
      </div>
      <div>
        <MovieList
          title={"Now Showing"}
          data={movie}
          onMovieClick={handleMovieClick}
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
