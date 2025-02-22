import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/login", { email, password });
      navigate("/"); // Redirect after successful login
    } catch (error) {
      console.log("Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: "600px" }}>
        <h2 className="text-center">
          🔑 <b>LOGIN</b>
        </h2>
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
          <button type="submit" className="btn btn-success w-100">LOGIN</button>
        </form>
        
        {/* Link to Register page */}
        <p className="text-center mt-3">
          New User? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
