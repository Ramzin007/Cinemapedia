import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/movieApi.js";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/library");
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-4xl font-bold">Login</h1>

      {error && (
        <p className="mb-4 rounded bg-red-900 p-3 text-red-200">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <button className="w-full rounded bg-red-600 px-4 py-3 font-semibold hover:bg-red-700">
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-400">
        No account?{" "}
        <Link to="/register" className="text-red-500 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;