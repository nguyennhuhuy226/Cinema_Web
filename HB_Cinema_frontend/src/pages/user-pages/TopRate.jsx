import React, { useEffect, useState } from "react";
import { getAllMovie } from "../../api/apiMovie";
import TopMovie from "../../components/User/top-movie/TopMovie";
import Footer from "../../components/User/footer/Footer";



const TopRate = () => {
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllMovie();
  }, []);

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
      {error && <p>{error}</p>}
      <TopMovie movie={movie} />
      <Footer />
    </div>
  );
};

export default TopRate;
