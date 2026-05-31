import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-red-600">
          Cinemapedia
        </Link>

        <div className="flex gap-6 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-white">
            Home
          </Link>

          <Link to="/library" className="hover:text-white">
            My Library
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;