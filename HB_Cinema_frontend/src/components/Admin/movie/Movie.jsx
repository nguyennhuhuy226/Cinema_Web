import React, { useState, useEffect } from "react";
import { getToken } from "../../../api/localStorage";
import './movie.css';
import DeleteMovie from "../modal-movie/DeleteMovie";
import AddMovie from "../modal-movie/AddMovie";
import EditMovie from "../modal-movie/EditMovie";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const API_URL = "http://localhost:8081/identity/movies";

  const fetchMovies = async () => {
    try {
      const token = getToken();
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `Ko thể lấy movie: ${response.status} - ${errorMessage}`
        );
      }

      const data = await response.json();
      console.log(data);

      if (Array.isArray(data.result)) {
        setMovies(data.result);
      } else {
        console.error(
          "Expected data.result to be an array, but got:",
          data.result
        );
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const addMovie = async (movies) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movies),
      });
      if (!response.ok) {
        throw new Error("Failed to add movie");
      }
      const newMovie = await response.json();
      setMovies((prevMovies) => [...prevMovies, newMovie]);
      await fetchMovies();
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const updateMovie = async (id, updatedMovie) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedMovie),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update Movie");
      }
      const updatedData = await response.json();
      setMovies((prevMovies) =>
        prevMovies.map((movie) => (movie.id === id ? updatedData : movie))
      );
      await fetchMovies();
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete Movie");
      }
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
      await fetchMovies();
    } catch (error) {
      console.error("Error deleting Movie:", error);
    }
  };

  return (
    <div className="movie-container">
      <div className="movie-header">
        <div className="add-button-container">
          <button
            className="add-movie-button"
            onClick={() => setIsAddModalOpen(true)}
          >
            + Add Movie
          </button>
        </div>
      </div>
      <div className="movie-table-container">
        <div className="table-wrapper">
          <table className="movie-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Movie Name</th>
                <th>Over View</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.image}`}
                      alt={movie.title}
                      className="movie-thumbnail"
                    />
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.overView}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-button"
                      onClick={() => {
                        setSelectedMovie(movie);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <span className="edit-icon"></span>
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => {
                        setSelectedMovie(movie);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <span className="delete-icon"></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <AddMovie
          onClose={() => setIsAddModalOpen(false)}
          onSave={(newMovie) => {
            addMovie(newMovie);
            setIsAddModalOpen(false);
          }}
        />
      )}
      {isEditModalOpen && selectedMovie && (
        <EditMovie
          movie={selectedMovie}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedMovie) => {
            updateMovie(selectedMovie.id, updatedMovie);
            setIsEditModalOpen(false);
          }}
        />
      )}
      {isDeleteModalOpen && selectedMovie && (
        <DeleteMovie
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            deleteMovie(selectedMovie.id);
            setIsDeleteModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Movie;