import React, { useState, useEffect } from "react";
import "./movie.css";
import DeleteMovie from "../modal-admin/DeleteMovie";
import AddMovie from "../modal-admin/AddMovie";
import EditMovie from "../modal-admin/EditMovie";
import { MdCalendarMonth, MdDelete, MdEdit } from "react-icons/md";
import AddScheduleByMovie from "../modal-admin/AddScheduleByMovie";
import { addScheduleByMovie } from "../../../api/apiSchedule";
import {
  addMovie,
  deleteMovie,
  getAllMovie,
  updateMovie,
} from "../../../api/apiMovie";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddScheduleByMovie, setIsScheduleByMovie] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllMovie();
  }, []);

  const fetchAllMovie = async () => {
    try {
      setError(null);
      const data = await getAllMovie();
      setMovies(data.result);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddMovie = async (movie) => {
    try {
      setError(null);
      await addMovie(movie);
      fetchAllMovie();
      alert("Successfully!");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  const handleUpdateMovie = async (id, updatedMovie) => {
    try {
      setError(null);
      await updateMovie(id, updatedMovie);
      fetchAllMovie();
      alert("Successfully!");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      setError(null);
      await deleteMovie(id);

      fetchAllMovie();
      alert("Successfully!");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  const handleAddScheduleByMovie = async (id, newSchedule) => {
    try {
      setError(null);
      await addScheduleByMovie(id, newSchedule);
      alert("Successfully!");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

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
                      <MdEdit />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => {
                        setSelectedMovie(movie);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <MdDelete />
                    </button>
                    <button
                      className="schedule-button"
                      onClick={() => {
                        setSelectedMovie(movie);
                        setIsScheduleByMovie(true);
                      }}
                    >
                      <MdCalendarMonth />
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
            handleAddMovie(newMovie);
            setIsAddModalOpen(false);
          }}
        />
      )}
      {isEditModalOpen && selectedMovie && (
        <EditMovie
          movie={selectedMovie}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedMovie) => {
            handleUpdateMovie(selectedMovie.id, updatedMovie);
            setIsEditModalOpen(false);
          }}
        />
      )}
      {isDeleteModalOpen && selectedMovie && (
        <DeleteMovie
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            handleDeleteMovie(selectedMovie.id);
            setIsDeleteModalOpen(false);
          }}
        />
      )}

      {isAddScheduleByMovie && (
        <AddScheduleByMovie
          onClose={() => setIsScheduleByMovie(false)}
          onSave={(newSchedule) => {
            handleAddScheduleByMovie(selectedMovie.id, newSchedule);
            setIsScheduleByMovie(false);
          }}
        />
      )}
    </div>
  );
};

export default Movie;
