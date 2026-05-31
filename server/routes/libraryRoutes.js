import express from "express";
import {
  saveMovie,
  getSavedMovies,
} from "../controllers/libraryController.js";

const router = express.Router();

router.post("/", saveMovie);
router.get("/", getSavedMovies);

export default router;