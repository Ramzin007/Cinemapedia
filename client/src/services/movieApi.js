import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/movies";

export const searchMovies = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/search`, {
    params: { query },
  });

  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);

  return response.data;
};