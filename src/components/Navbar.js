import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  // Managing login state locally
  const [user, setUser] = useState(null);

  // Check if the user is logged in on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Check localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user if found in localStorage
    }
  }, []);

  const handleLogin = () => {
    // You can handle login logic here and store user in localStorage
    const dummyUser = { name: "John Doe", email: "john@example.com" };
    localStorage.setItem("user", JSON.stringify(dummyUser)); // Store user in localStorage
    setUser(dummyUser); // Update the user state
  };

  const handleLogout = () => {
    // Clear user data from localStorage and state
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">🍽️ Recipe Hub</Link>
        <div>
          <Link className="btn btn-warning me-2" to="/add">➕ Add Recipe</Link>
          {user ? (
            <>
              <button className="btn btn-light" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn btn-light mx-2" to="/login" onClick={handleLogin}>🔑 Login</Link>
              <Link className="btn btn-warning" to="/register">📝 Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
