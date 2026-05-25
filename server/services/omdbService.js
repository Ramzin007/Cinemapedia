import axios from "axios";

export const searchMoviesFromOMDB = async (query) => {
  const response = await axios.get(
    `${process.env.OMDB_BASE_URL}/?apikey=${process.env.OMDB_API_KEY}&s=${query}`
  );

  return response.data;
};