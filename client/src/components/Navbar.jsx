import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user = (() => {
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClassName = ({ isActive }) =>
    `rounded-full px-3 py-2 transition duration-200 ${
      isActive
        ? "bg-white/10 text-white shadow-sm shadow-red-950/30"
        : "text-zinc-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:flex-nowrap sm:px-6">
        <Link
          to="/"
          className="text-xl font-black tracking-wide text-red-500 transition hover:text-red-400 sm:text-2xl"
        >
          Cinemapedia
        </Link>

        <div className="flex w-full items-center justify-between gap-1 text-sm font-semibold sm:w-auto sm:justify-end sm:gap-2">
          <NavLink to="/" className={linkClassName}>
            Home
          </NavLink>

          {token ? (
            <>
              <NavLink to="/library" className={linkClassName}>
                My Library
              </NavLink>

              <span className="hidden max-w-36 truncate rounded-full border border-white/10 px-3 py-2 text-zinc-400 md:inline">
                {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-full bg-red-600 px-4 py-2 text-white shadow-lg shadow-red-950/40 transition duration-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClassName}>
                Login
              </NavLink>

              <NavLink to="/register" className={linkClassName}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
