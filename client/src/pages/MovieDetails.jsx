import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, saveMovieToLibrary } from "../services/movieApi.js";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(id);

        setMovie(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleSaveMovie = async () => {
    try {
      await saveMovieToLibrary({
        movieId: movie.id,
        title: movie.title,
        year: movie.year,
        poster: movie.poster,
      });

      toast.success("Movie saved");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 409) {
        toast.error("Movie already exists in library");
      } else {
        toast.error("Failed to save movie");
      }
    }
  };

  if (loading) return <Spinner />;

  if (error) return <p>{error}</p>;

  if (!movie) return <p>Movie not found</p>;

  return (
  <div className="mx-auto max-w-6xl px-4 py-8">
    <div className="grid gap-8 md:grid-cols-3">

      <div>
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full rounded-xl shadow-lg"
        />

        <button
          onClick={handleSaveMovie}
          className="mt-4 w-full rounded-lg bg-red-600 px-4 py-3 font-semibold hover:bg-red-700"
        >
          Save to Library
        </button>
      </div>

      <div className="md:col-span-2">

        <h1 className="mb-4 text-4xl font-bold">
          {movie.title}
        </h1>

        <div className="mb-6 flex flex-wrap gap-3">
          <span className="rounded bg-yellow-500 px-3 py-1 font-semibold text-black">
            ⭐ {movie.imdbRating}
          </span>

          <span className="rounded bg-zinc-800 px-3 py-1">
            {movie.year}
          </span>

          <span className="rounded bg-zinc-800 px-3 py-1">
            {movie.runtime}
          </span>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">
            Plot
          </h2>

          <p className="text-gray-300">
            {movie.plot}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <p>
              <span className="font-semibold">
                Genre:
              </span>{" "}
              {movie.genre}
            </p>

            <p>
              <span className="font-semibold">
                Director:
              </span>{" "}
              {movie.director}
            </p>

            <p>
              <span className="font-semibold">
                Released:
              </span>{" "}
              {movie.released}
            </p>
          </div>

          <div>
            <p>
              <span className="font-semibold">
                Language:
              </span>{" "}
              {movie.language}
            </p>

            <p>
              <span className="font-semibold">
                Country:
              </span>{" "}
              {movie.country}
            </p>

            <p>
              <span className="font-semibold">
                Actors:
              </span>{" "}
              {movie.actors}
            </p>
          </div>

        </div>

      </div>
    </div>
  </div>
);
}

export default MovieDetails;