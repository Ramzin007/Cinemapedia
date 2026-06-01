import SavedMovie from "../models/SavedMovie.js";

export const saveMovie = async (req, res) => {
  try {
    const { movieId, title, year, poster } = req.body;

    if (!movieId || !title) {
      return res.status(400).json({
        error: "movieId and title are required",
      });
    }

    const existingMovie = await SavedMovie.findOne({
      userId: req.user._id,
      movieId,
    });

    if (existingMovie) {
      return res.status(409).json({
        error: "Movie already exists in library",
      });
    }

    const savedMovie = await SavedMovie.create({
      userId: req.user._id,
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
    const movies = await SavedMovie.find({ userId: req.user._id }).sort({ createdAt: -1 });

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

    const deletedMovie = await SavedMovie.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

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

export const updateSavedMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const allowedUpdates = [
      "isWatchlisted",
      "isWatched",
      "isFavorite",
      "personalRating",
    ];

    const updates = {};

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedMovie = await SavedMovie.findOneAndUpdate(
      {
        _id: id,
        userId: req.user._id,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        error: "Saved movie not found",
      });
    }

    res.json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update saved movie",
    });
  }
};