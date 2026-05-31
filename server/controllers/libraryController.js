import SavedMovie from "../models/SavedMovie.js";

export const saveMovie = async (req, res) => {
  try {
    const { movieId, title, year, poster } = req.body;

    if (!movieId || !title) {
      return res.status(400).json({
        error: "movieId and title are required",
      });
    }

    const existingMovie = await SavedMovie.findOne({ movieId });

    if (existingMovie) {
      return res.status(409).json({
        error: "Movie already exists in library",
      });
    }

    const savedMovie = await SavedMovie.create({
      movieId,
      title,
      year,
      poster,
      isWatchlisted: true,
    });

    res.status(201).json(savedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to save movie",
    });
  }
};

export const getSavedMovies = async (req, res) => {
  try {
    const movies = await SavedMovie.find().sort({ createdAt: -1 });

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch saved movies",
    });
  }
};

export const deleteSavedMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMovie = await SavedMovie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({
        error: "Saved movie not found",
      });
    }

    res.json({
      message: "Movie removed from library",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete saved movie",
    });
  }
};