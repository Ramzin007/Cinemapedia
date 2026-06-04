import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const movieLinkId = movie.id || movie.movieId;
  const posterSrc =
    movie.poster && movie.poster !== "N/A"
      ? movie.poster
      : "https://placehold.co/300x450?text=No+Poster";

  return (
    <Link to={`/movies/${movieLinkId}`}>
      <div className="overflow-hidden rounded-xl bg-zinc-900 shadow-lg transition duration-300 hover:scale-105 hover:bg-zinc-800">

        <img
          src={posterSrc}
          alt={movie.title || "Movie poster"}
          className="h-80 w-full object-cover"
        />

        <div className="p-4">
          <h2 className="truncate text-lg font-semibold">
            {movie.title}
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            {movie.year}
          </p>
        </div>

      </div>
    </Link>
  );
}

export default MovieCard;