import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 🔄 Loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading

    try {
      console.log("🔄 Attempting Login:", { email, password });

      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("✅ Backend Response:", response.data);

      if (response.data.token && response.data.user) {
        // ✅ Store user & token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        console.log("🔑 Stored User:", localStorage.getItem("user"));

        setLoading(false);
        navigate("/");
        window.location.reload(); // 🔄 Refresh to update Navbar
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("❌ Login failed:", error);
      setLoading(false);

      if (error.response && error.response.data) {
        setError(error.response.data.message || "Login failed. Please try again.");
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center">
          🔑 <b>LOGIN</b>
        </h2>

        {error && <p className="text-danger text-center">{error}</p>} {/* 🔥 Show error message */}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>
        
        <p className="text-center mt-3">
          New User? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
