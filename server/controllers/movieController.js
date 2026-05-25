import { searchMoviesFromOMDB } from "../services/omdbService.js";

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