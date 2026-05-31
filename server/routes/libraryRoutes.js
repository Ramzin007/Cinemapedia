import express from "express";
import {
  saveMovie,
  getSavedMovies,
  deleteSavedMovie,
} from "../controllers/libraryController.js";

const router = express.Router();

router.post("/", saveMovie);
router.get("/", getSavedMovies);
router.delete("/:id", deleteSavedMovie);

export default router;