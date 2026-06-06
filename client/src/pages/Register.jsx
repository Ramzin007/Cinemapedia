import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/movieApi.js";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      
      setLoading(true);
      await registerUser(formData);

      navigate("/login");
    } catch (error) {
      console.error(error);
      setLoading(false);
      if (error.response?.status === 409) {
        setError("User already exists");
        toast.error("User already exists");
      } else {
        setError("Failed to register");
        toast.error("Failed to register");
      }
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-180px)] max-w-6xl items-center px-4 py-12 sm:px-6">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/40 sm:p-8">
      <h1 className="mb-2 text-4xl font-black">Register</h1>
      <p className="mb-6 text-sm text-zinc-400">Start building a watchlist worth revisiting.</p>

      {error && (
        <p className="mb-5 rounded-xl border border-red-500/30 bg-red-950/70 p-3 text-red-100">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-red-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-red-950/40 transition duration-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:bg-red-900 disabled:text-red-200"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-red-400 hover:text-red-300">
          Login
        </Link>
      </p>
      </div>
    </main>
  );
}

export default Register;
