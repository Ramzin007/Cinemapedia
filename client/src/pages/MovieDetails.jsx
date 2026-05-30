import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieApi.js";

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

  if (loading) return <p>Loading movie details...</p>;

  if (error) return <p>{error}</p>;

  if (!movie) return <p>Movie not found</p>;

  return (
    <div>
      <h1>{movie.title}</h1>

      <img src={movie.poster} alt={movie.title} width="200" />

      <p>{movie.plot}</p>

      <p>IMDb Rating: {movie.imdbRating}</p>
    </div>
  );
}

export default MovieDetails;