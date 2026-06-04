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
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-4xl font-bold">Register</h1>

      {error && (
        <p className="mb-4 rounded bg-red-900 p-3 text-red-200">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded bg-zinc-900 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded bg-zinc-900 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded bg-zinc-900 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-red-600"
        />

        <button
          disabled={loading}
          className="w-full rounded bg-red-600 px-4 py-3 font-semibold hover:bg-red-700 disabled:bg-red-900"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-red-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;