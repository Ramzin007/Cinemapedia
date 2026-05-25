import axios from "axios";

export const searchMoviesFromOMDB = async (query) => {
  const response = await axios.get(
    `${process.env.OMDB_BASE_URL}/?apikey=${process.env.OMDB_API_KEY}&s=${query}`
  );

  if (response.data.Response === "False") {
    return [];
  }

  return response.data.Search.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
    type: movie.Type,
  }));
};