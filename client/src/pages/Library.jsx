import { useEffect, useState } from "react";
import {
  getSavedMovies,
  deleteSavedMovie,
  updateSavedMovie,
} from "../services/movieApi.js";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import LibraryMovieCard from "../components/LibraryMovieCard.jsx";
import EmptyState from "../components/EmptyState";

function Library() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getSavedMovies();
        setMovies(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load library");
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
      toast.error("Failed to delete movie");
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
      toast.error("Failed to update movie");
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
      toast.error("Failed to update movie");
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
      toast.error("Failed to update movie");
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
    return <Spinner />;
  }

  const filters = [
    { id: "all", label: "All Movies" },
    { id: "favorites", label: "Favorites" },
    { id: "watched", label: "Watched" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 flex flex-col gap-3 sm:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-400">
          Your collection
        </p>
        <h1 className="text-4xl font-black sm:text-5xl">
          My Library
        </h1>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 shadow-xl shadow-black/20">
          <p className="text-sm font-medium text-zinc-400">
            Total Movies
          </p>
          <h2 className="mt-2 text-3xl font-black">
            {totalMovies}
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 shadow-xl shadow-black/20">
          <p className="text-sm font-medium text-zinc-400">
            Favorites
          </p>
          <h2 className="mt-2 text-3xl font-black">
            {favoriteMovies}
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 shadow-xl shadow-black/20">
          <p className="text-sm font-medium text-zinc-400">
            Watched
          </p>
          <h2 className="mt-2 text-3xl font-black">
            {watchedMovies}
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 shadow-xl shadow-black/20">
          <p className="text-sm font-medium text-zinc-400">
            Watchlist
          </p>
          <h2 className="mt-2 text-3xl font-black">
            {watchlistMovies}
          </h2>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`rounded-xl px-4 py-2.5 text-sm font-bold transition duration-200 ${
              activeFilter === filter.id
                ? "bg-red-600 text-white shadow-lg shadow-red-950/40"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filteredMovies.length === 0 ? (
        <EmptyState
          title="No movies found"
          description="Start building your collection by searching and adding movies to your library."
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
    </main>
  );
}

export default Library;
