import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const movieLinkId = movie.id || movie.movieId;

  return (
    <Link to={`/movies/${movieLinkId}`}>
      <div className="overflow-hidden rounded-xl bg-zinc-900 transition duration-300 hover:scale-105 hover:bg-zinc-800">
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-72 w-full object-cover"
        />

        <div className="p-3">
          <h2 className="truncate font-semibold">{movie.title}</h2>
          <p className="text-sm text-gray-400">{movie.year}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;