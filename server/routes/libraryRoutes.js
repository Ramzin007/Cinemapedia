import express from "express";
import {
  saveMovie,
  getSavedMovies,
  deleteSavedMovie,
  updateSavedMovie,
} from "../controllers/libraryController.js";

const router = express.Router();

router.post("/", saveMovie);
router.get("/", getSavedMovies);
router.delete("/:id", deleteSavedMovie);
router.patch("/:id", updateSavedMovie);

export default router;