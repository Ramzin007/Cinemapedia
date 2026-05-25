import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});