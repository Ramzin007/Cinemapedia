import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/movies";
const LIBRARY_API_URL = "http://localhost:5000/api/library";

export const saveMovieToLibrary = async (movie) => {
  const response = await axios.post(LIBRARY_API_URL, movie);
  return response.data;
};

export const getSavedMovies = async () => {
  const response = await axios.get(LIBRARY_API_URL);
  return response.data;
};

export const deleteSavedMovie = async (id) => {
  const response = await axios.delete(`${LIBRARY_API_URL}/${id}`);
  return response.data;
};

export const updateSavedMovie = async (id, updates) => {
  const response = await axios.patch(`${LIBRARY_API_URL}/${id}`, updates);
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/search`, {
    params: { query },
  });

  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(
    `${API_BASE_URL}/${id}`
  );

  return response.data;
};