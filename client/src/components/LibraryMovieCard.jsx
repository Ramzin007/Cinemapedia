import { Link } from "react-router-dom";

function LibraryMovieCard({
  movie,
  onDelete,
  onToggleFavorite,
  onToggleWatched,
  onRatingChange,
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-zinc-900">
      <Link to={`/movies/${movie.movieId}`}>
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-72 w-full object-cover"
        />
      </Link>

      <div className="space-y-3 p-3">
        <div>
          <h2 className="truncate font-semibold">{movie.title}</h2>
          <p className="text-sm text-gray-400">{movie.year}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          <button
            onClick={() => onToggleFavorite(movie)}
            className={`rounded px-3 py-1 ${
              movie.isFavorite ? "bg-red-600" : "bg-zinc-700"
            }`}
          >
            {movie.isFavorite ? "Favorite" : "Add Favorite"}
          </button>

          <button
            onClick={() => onToggleWatched(movie)}
            className={`rounded px-3 py-1 ${
              movie.isWatched ? "bg-green-600" : "bg-zinc-700"
            }`}
          >
            {movie.isWatched ? "Watched" : "Mark Watched"}
          </button>
        </div>

        <select
          value={movie.personalRating || ""}
          onChange={(e) => onRatingChange(movie, e.target.value)}
          className="w-full rounded bg-zinc-800 px-3 py-2 text-white"
        >
          <option value="">Rate movie</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
            <option key={rating} value={rating}>
              {rating}/10
            </option>
          ))}
        </select>

        <button
          onClick={() => onDelete(movie._id)}
          className="w-full rounded bg-red-700 px-3 py-2 text-sm hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default LibraryMovieCard;