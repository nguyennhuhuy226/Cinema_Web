import "./movie-card.css";

const MovieCard = ({ title, movie }) => {

  const moviesToShow = movie.slice(0, 7);

  return (
    <div className="movie-card-container">
      {title && <h2 className="movie-card-list-title">{title}</h2>}
      {moviesToShow.map((item) => (
        <div key={item.id} className="movie-card">
          <img
            src={item.image}
            alt={item.title}
            className="movie-card-poster"
          />
          <div className="movie-card-info">
            <h3 className="movie-card-title">{item.title}</h3>
            <p className="movie-card-release">
              Release Date: {new Date(item.releaseDate).toLocaleDateString()}
            </p>
            <p className="movie-card-duration">
              Duration: {item.duration} min
            </p>
            <p className="movie-card-language">Language: {item.language}</p>
            <div className="movie-card-rating">
              Rating: {item.rating}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
