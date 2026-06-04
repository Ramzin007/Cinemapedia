import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-red-600">
          Cinemapedia
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-white">
            Home
          </Link>

          {token ? (
            <>
              <Link to="/library" className="hover:text-white">
                My Library
              </Link>

              <span className="hidden text-gray-500 md:inline">
                {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>

              <Link to="/register" className="hover:text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;