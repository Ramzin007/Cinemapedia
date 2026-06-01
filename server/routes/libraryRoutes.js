import express from "express";
import {
  saveMovie,
  getSavedMovies,
  deleteSavedMovie,
  updateSavedMovie,
} from "../controllers/libraryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, saveMovie);
router.get("/", protect, getSavedMovies);
router.delete("/:id", protect, deleteSavedMovie);
router.patch("/:id", protect, updateSavedMovie);

export default router;