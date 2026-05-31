import mongoose from "mongoose";

const savedMovieSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    movieId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    year: String,
    poster: String,

    isWatchlisted: {
      type: Boolean,
      default: false,
    },

    isWatched: {
      type: Boolean,
      default: false,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    personalRating: {
      type: Number,
      min: 1,
      max: 10,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const SavedMovie = mongoose.model("SavedMovie", savedMovieSchema);

export default SavedMovie;