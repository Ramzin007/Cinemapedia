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

  if (error) {
    return (
      <p className="mx-auto max-w-6xl px-4 py-12 text-red-200">
        {error}
      </p>
    );
  }

  if (!movie) {
    return (
      <p className="mx-auto max-w-6xl px-4 py-12 text-zinc-300">
        Movie not found
      </p>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid gap-8 lg:grid-cols-[minmax(240px,360px)_1fr] lg:gap-12">
        <div>
          <img
            src={movie.poster}
            alt={movie.title}
            className="aspect-[2/3] w-full rounded-2xl border border-white/10 object-cover shadow-2xl shadow-black/60"
          />

          <button
            onClick={handleSaveMovie}
            className="mt-5 w-full rounded-xl bg-red-600 px-5 py-4 font-bold text-white shadow-lg shadow-red-950/40 transition duration-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            Save to Library
          </button>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="mb-5 text-4xl font-black leading-tight sm:text-5xl">
            {movie.title}
          </h1>

          <div className="mb-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black shadow-lg shadow-yellow-950/30">
              IMDb {movie.imdbRating}
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200">
              {movie.year}
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200">
              {movie.runtime}
            </span>
          </div>

          <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <h2 className="mb-3 text-xl font-bold">
              Plot
            </h2>

            <p className="leading-8 text-zinc-300">
              {movie.plot}
            </p>
          </div>

          <div className="grid gap-4 text-sm leading-7 text-zinc-300 md:grid-cols-2">
            <div className="space-y-2 rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
              <p>
                <span className="font-bold text-white">
                  Genre:
                </span>{" "}
                {movie.genre}
              </p>

              <p>
                <span className="font-bold text-white">
                  Director:
                </span>{" "}
                {movie.director}
              </p>

              <p>
                <span className="font-bold text-white">
                  Released:
                </span>{" "}
                {movie.released}
              </p>
            </div>

            <div className="space-y-2 rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
              <p>
                <span className="font-bold text-white">
                  Language:
                </span>{" "}
                {movie.language}
              </p>

              <p>
                <span className="font-bold text-white">
                  Country:
                </span>{" "}
                {movie.country}
              </p>

              <p>
                <span className="font-bold text-white">
                  Actors:
                </span>{" "}
                {movie.actors}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;
