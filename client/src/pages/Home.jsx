import { useState } from "react";
import { searchMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

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
    } catch (error) {
        console.error(error);
        setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <h1>Cinemapedia</h1>

        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

        {loading && <p>Loading...</p>}

        {error && <p>{error}</p>}

        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
  );
}

export default Home;