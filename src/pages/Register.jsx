import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", user);
      setMessage(response.data.message);
      if (response.data.success) {
        navigate("/login"); // Redirect to login after registration
      }
    } catch (error) {
      setMessage("Error registering user.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">🔑 Register</h2>
      {message && <p className="alert alert-info">{message}</p>}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Register
              </button>
            </form>
            {/* Link to login page if already registered */}
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login Here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
