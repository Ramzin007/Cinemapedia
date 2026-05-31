import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/library", libraryRoutes);

// Test Routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'GET test route works!' });
});

app.post('/api/test', (req, res) => {
  res.json({ message: 'POST test route works!', data: req.body });
});

app.get('/api/hello/:name', (req, res) => {
  const { name } = req.params;
  res.json({ message: `Hello, ${name}!` });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});