import { Link } from "react-router-dom";

function LibraryMovieCard({
  movie,
  onDelete,
  onToggleFavorite,
  onToggleWatched,
  onRatingChange,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-xl shadow-black/30 transition duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-950/20">
      <Link to={`/movies/${movie.movieId}`} className="block overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="aspect-[2/3] w-full object-cover transition duration-500 hover:scale-105"
        />
      </Link>

      <div className="space-y-4 p-4">
        <div>
          <h2 className="truncate font-bold text-white">{movie.title}</h2>
          <p className="mt-1 text-sm font-medium text-zinc-500">{movie.year}</p>
        </div>

        <div className="grid gap-2 text-sm">
          <button
            onClick={() => onToggleFavorite(movie)}
            className={`rounded-xl px-3 py-2 font-semibold transition duration-200 ${
              movie.isFavorite
                ? "bg-red-600 text-white shadow-lg shadow-red-950/30"
                : "bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {movie.isFavorite ? "Favorite" : "Add Favorite"}
          </button>

          <button
            onClick={() => onToggleWatched(movie)}
            className={`rounded-xl px-3 py-2 font-semibold transition duration-200 ${
              movie.isWatched
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/30"
                : "bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {movie.isWatched ? "Watched" : "Mark Watched"}
          </button>
        </div>

        <select
          value={movie.personalRating || ""}
          onChange={(e) => onRatingChange(movie, e.target.value)}
          className={`w-full cursor-pointer rounded-xl border px-3 py-2.5 text-sm font-semibold outline-none transition duration-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 ${
            movie.personalRating
              ? "border-amber-400/40 bg-amber-400/10 text-amber-200"
              : "border-white/10 bg-black/40 text-zinc-300 hover:border-amber-400/30 hover:bg-amber-400/5"
          }`}
        >
          <option value="" className="bg-zinc-950 text-zinc-200">
            Rate movie
          </option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
            <option
              key={rating}
              value={rating}
              className="bg-zinc-950 text-white"
            >
              {rating}/10
            </option>
          ))}
        </select>

        <button
          onClick={() => onDelete(movie._id)}
          className="w-full rounded-xl border border-red-500/30 bg-red-950/60 px-3 py-2.5 text-sm font-bold text-red-100 transition duration-200 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default LibraryMovieCard;
