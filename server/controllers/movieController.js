import {
  searchMoviesFromOMDB,
  getMovieDetailsFromOMDB,
} from "../services/omdbService.js";

export const searchMovies = async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).json({
        error: "Query is required",
      });
    }

    const data = await searchMoviesFromOMDB(query);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch movies",
    });
  }
};

export const getMovieDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await getMovieDetailsFromOMDB(id);

    if (!data) {
      return res.status(404).json({
        error: "Movie not found",
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch movie details",
    });
  }
};
