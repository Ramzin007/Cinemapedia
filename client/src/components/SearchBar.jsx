function SearchBar({ query, setQuery, onSearch, loading }) {
  return (
    <div className="mx-auto mb-10 flex max-w-3xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 shadow-2xl shadow-red-950/20 sm:flex-row">
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
        className="min-h-14 flex-1 rounded-xl border border-white/10 bg-zinc-950/80 px-5 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
      />

      <button
        onClick={onSearch}
        disabled={loading}
        className="min-h-14 rounded-xl bg-red-600 px-7 font-bold text-white shadow-lg shadow-red-950/40 transition duration-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:bg-red-900 disabled:text-red-200"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}

export default SearchBar;
