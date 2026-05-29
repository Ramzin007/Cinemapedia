import { useState } from "react";
import { searchMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");

      const results = await searchMovies(query);

      setMovies(results);
    } catch (err) {
      setError("Failed to fetch movies");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Cinemapedia</h1>

      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {movies.map((movie) => (
  <MovieCard key={movie.id} movie={movie} />
))}
    </div>
  );
}

export default Home;