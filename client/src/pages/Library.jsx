import { useEffect, useState } from "react";
import {
  getSavedMovies,
  deleteSavedMovie,
  updateSavedMovie,
} from "../services/movieApi.js";

import LibraryMovieCard from "../components/LibraryMovieCard.jsx";

function Library() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getSavedMovies();
        setMovies(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load library");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
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
    try {
      const updatedMovie = await updateSavedMovie(movie._id, {
        isFavorite: !movie.isFavorite,
      });

      setMovies((prevMovies) =>
        prevMovies.map((m) =>
          m._id === movie._id ? updatedMovie : m
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleWatched = async (movie) => {
    try {
      const updatedMovie = await updateSavedMovie(movie._id, {
        isWatched: !movie.isWatched,
      });

      setMovies((prevMovies) =>
        prevMovies.map((m) =>
          m._id === movie._id ? updatedMovie : m
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleRatingChange = async (movie, rating) => {
    try {
      const updatedMovie = await updateSavedMovie(movie._id, {
        personalRating: Number(rating),
      });

      setMovies((prevMovies) =>
        prevMovies.map((m) =>
          m._id === movie._id ? updatedMovie : m
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filteredMovies = movies.filter((movie) => {
  if (activeFilter === "favorites") return movie.isFavorite;
  if (activeFilter === "watched") return movie.isWatched;

  return true;
});

  const totalMovies = movies.length;

  const favoriteMovies = movies.filter(
    (movie) => movie.isFavorite
  ).length;

  const watchedMovies = movies.filter(
    (movie) => movie.isWatched
  ).length;

  const watchlistMovies = movies.filter(
    (movie) => movie.isWatchlisted
  ).length;

  if (loading) {
    return (
      <div className="p-8 text-center">
        Loading library...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  const filters = [
  { id: "all", label: "All Movies" },
  { id: "favorites", label: "Favorites" },
  { id: "watched", label: "Watched" },
];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">
        My Library
      </h1>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-zinc-900 p-4">
          <p className="text-sm text-gray-400">
            Total Movies
          </p>
          <h2 className="text-3xl font-bold">
            {totalMovies}
          </h2>
        </div>

        <div className="rounded-xl bg-zinc-900 p-4">
          <p className="text-sm text-gray-400">
            Favorites
          </p>
          <h2 className="text-3xl font-bold">
            {favoriteMovies}
          </h2>
        </div>

        <div className="rounded-xl bg-zinc-900 p-4">
          <p className="text-sm text-gray-400">
            Watched
          </p>
          <h2 className="text-3xl font-bold">
            {watchedMovies}
          </h2>
        </div>

        <div className="rounded-xl bg-zinc-900 p-4">
          <p className="text-sm text-gray-400">
            Watchlist
          </p>
          <h2 className="text-3xl font-bold">
            {watchlistMovies}
          </h2>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
  {filters.map((filter) => (
    <button
      key={filter.id}
      onClick={() => setActiveFilter(filter.id)}
      className={`rounded-full px-4 py-2 text-sm font-medium ${
        activeFilter === filter.id
          ? "bg-red-600 text-white"
          : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
      }`}
    >
      {filter.label}
    </button>
  ))}
</div>

      {filteredMovies.length === 0 ? (
        <div className="rounded-xl bg-zinc-900 p-8 text-center">
          <h2 className="text-2xl font-semibold">
            No movies saved yet
          </h2>

          <p className="mt-2 text-gray-400">
            Search for movies and add them to your library.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {filteredMovies.map((movie) => (
            <LibraryMovieCard
              key={movie._id}
              movie={movie}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
              onToggleWatched={handleToggleWatched}
              onRatingChange={handleRatingChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;