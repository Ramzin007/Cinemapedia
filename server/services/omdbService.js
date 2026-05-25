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

export const getMovieDetailsFromOMDB = async (id) => {
  const response = await axios.get(
    `${process.env.OMDB_BASE_URL}/?apikey=${process.env.OMDB_API_KEY}&i=${id}&plot=full`
  );

  if (response.data.Response === "False") {
    return null;
  }

  const movie = response.data;

  return {
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    rated: movie.Rated,
    released: movie.Released,
    runtime: movie.Runtime,
    genre: movie.Genre,
    director: movie.Director,
    actors: movie.Actors,
    plot: movie.Plot,
    language: movie.Language,
    country: movie.Country,
    poster: movie.Poster,
    imdbRating: movie.imdbRating,
  };
};
