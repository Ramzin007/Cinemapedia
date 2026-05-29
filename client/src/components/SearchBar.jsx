function SearchBar({ query, setQuery, onSearch }) {
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />

      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default SearchBar;