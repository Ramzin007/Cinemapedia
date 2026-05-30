import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <div>
        <img src={movie.poster} alt={movie.title} width="150" />
        <h2>{movie.title}</h2>
        <p>{movie.year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;