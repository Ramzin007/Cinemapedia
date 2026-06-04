function SearchBar({ query, setQuery, onSearch, loading }) {
  return (
    <div className="mx-auto mb-12 flex max-w-2xl flex-col gap-3 px-4 sm:flex-row">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
        placeholder="Search movies..."
        className="flex-1 rounded-xl bg-zinc-900 px-5 py-4 text-white outline-none ring-1 ring-zinc-700 placeholder:text-gray-500 focus:ring-2 focus:ring-red-600"
      />

      <button
        onClick={onSearch}
        disabled={loading}
        className="rounded-xl bg-red-600 px-6 py-4 font-semibold text-white hover:bg-red-700 disabled:bg-red-900"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}

export default SearchBar;