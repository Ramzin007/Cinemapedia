import { useState } from "react";
import { searchMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Hero from "../components/Hero";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import EmptyState from "../components/EmptyState";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  <SearchBar
    query={query}
    setQuery={setQuery}
    onSearch={handleSearch}
    loading={loading}
  />

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");

      const results = await searchMovies(query);

      setMovies(results);
    } catch (error) {
        console.error(error);
        toast.error("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      < Hero />
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      {loading && <Spinner />}

      {error && (
        <p className="mb-6 rounded bg-red-900 p-3 text-red-200">
          {error}
        </p>
      )}

      {movies.length === 0 && !loading ? (
        <div className="mt-10 grid place-items-center px-4">
          <EmptyState
            emoji="🔍"
            title="No results found"
            description="Try searching for another movie."
          />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-4 py-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id || movie.movieId} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;