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
          <Link className="btn btn-success me-2" to="/recipes">📖 All Recipes</Link> 
          {user ? (
            <>
              <Link className="btn btn-warning me-2" to="/add">➕ Add Recipe</Link>
              <button className="btn btn-light" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn btn-light mx-2" to="/login">🔑 Login</Link>
              <Link className="btn btn-warning" to="/register">📝 Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
