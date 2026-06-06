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
    <main className="mx-auto max-w-6xl px-4 sm:px-6">
      <Hero />
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        loading={loading}
      />

      {loading && <Spinner />}

      {error && (
        <p className="mx-auto mb-8 max-w-3xl rounded-xl border border-red-500/30 bg-red-950/70 p-4 text-red-100">
          {error}
        </p>
      )}

      {movies.length === 0 && !loading ? (
        <div className="mt-10 grid place-items-center">
          <EmptyState
            emoji="Search"
            title="No results found"
            description="Try searching for another movie."
          />
        </div>
      ) : (
        <div className="grid gap-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id || movie.movieId} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;
