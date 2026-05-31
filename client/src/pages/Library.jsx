import { useEffect, useState } from "react";
import {
  getSavedMovies,
  deleteSavedMovie,
} from "../services/movieApi.js";
import { updateSavedMovie } from "../services/movieApi.js";
import MovieCard from "../components/MovieCard.jsx";

function Library() {

const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  const fetchSavedMovies = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getSavedMovies();
      setMovies(data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch saved movies");
    } finally {
      setLoading(false);
    }
  };

  fetchSavedMovies();
}, []);

const handleDelete = async (id) => {
  try {
    await deleteSavedMovie(id);

    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie._id !== id)
    );
  } catch (error) {
    console.error(error);
    setError("Failed to delete movie");
  }
};

const handleToggleFavorite = async (movie) => {
  const updatedMovie = await updateSavedMovie(movie._id, {
    isFavorite: !movie.isFavorite,
  });

  setMovies((prevMovies) =>
    prevMovies.map((m) =>
      m._id === movie._id ? updatedMovie : m
    )
  );
};

const handleToggleWatched = async (movie) => {
  const updatedMovie = await updateSavedMovie(movie._id, {
    isWatched: !movie.isWatched,
  });

  setMovies((prevMovies) =>
    prevMovies.map((m) =>
      m._id === movie._id ? updatedMovie : m
    )
  );
};

const handleRatingChange = async (movie, rating) => {
  const updatedMovie = await updateSavedMovie(movie._id, {
    personalRating: Number(rating),
  });

  setMovies((prevMovies) =>
    prevMovies.map((m) =>
      m._id === movie._id ? updatedMovie : m
    )
  );
};

  if (loading) return <p>Loading library...</p>;

  if (error) return <p>{error}</p>;
    if (movies.length === 0) return <p>Your library is empty</p>;
  return (
    <div>
      <h1>My Library</h1>

      {movies.map((movie) => (
        <div key={movie._id}>
            <MovieCard movie={movie} />

            <button onClick={() => handleDelete(movie._id)}>
             Remove
            </button>
            <button onClick={() => handleToggleFavorite(movie)}>
                {movie.isFavorite ? "Unfavorite" : "Favorite"}
            </button>

            <button onClick={() => handleToggleWatched(movie)}>
                {movie.isWatched ? "Mark Unwatched" : "Mark Watched"}
            </button>

            <select value={movie.personalRating || ""}
                onChange={(e) => handleRatingChange(movie, e.target.value)}
            >
            <option value="">Rate</option>
                {[1,2,3,4,5,6,7,8,9,10].map((rating) => (
            <option key={rating} value={rating}>
                {rating}
            </option>
                ))}
            </select>
        </div>
        ))}
    </div>
  );
}

export default Library;