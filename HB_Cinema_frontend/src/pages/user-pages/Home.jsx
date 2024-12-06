import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/User/banner/Banner";
import MovieList from "../../components/User/movie-list/MovieList";
import Footer from "../../components/User/footer/Footer";
import { getAllMovie } from "../../api/apiMovie";
import Blog from "../../components/User/blog/Blog";


const Home = () => {
  const [movie, setMovie] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllMovie();
  }, []);

  const fetchAllMovie = async () => {
    try {
      const data = await getAllMovie();
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
     
        <Blog />
  
     
   
        <Footer />
      x
    </div>
  );
};

export default Home;
