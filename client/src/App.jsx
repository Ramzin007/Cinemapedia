import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Library from "./pages/Library.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </div>
  );
}

export default App;