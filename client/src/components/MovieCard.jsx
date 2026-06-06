import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const movieLinkId = movie.id || movie.movieId;
  const posterSrc =
    movie.poster && movie.poster !== "N/A"
      ? movie.poster
      : "https://placehold.co/300x450?text=No+Poster";

  return (
    <Link to={`/movies/${movieLinkId}`} className="group block h-full">
      <div className="h-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-xl shadow-black/30 transition duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-zinc-900 hover:shadow-2xl hover:shadow-red-950/25">

        <img
          src={posterSrc}
          alt={movie.title || "Movie poster"}
          className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="p-4">
          <h2 className="truncate text-base font-bold text-white">
            {movie.title}
          </h2>

          <p className="mt-1 text-sm font-medium text-zinc-500">
            {movie.year}
          </p>
        </div>

      </div>
    </Link>
  );
}

export default MovieCard;
