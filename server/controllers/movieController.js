export const searchMovies = (req, res) => {
  const query = req.query.query;

  res.json({
    message: "Search endpoint working",
    searchedFor: query,
  });
};