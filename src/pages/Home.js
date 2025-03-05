import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css";

const Home = () => {
  const navigate = useNavigate(); // Initialize navigation

  const sampleRecipes = [
    { name: "Pancakes", image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Spaghetti Bolognese", image: "https://images.pexels.com/photos/28767857/pexels-photo-28767857/free-photo-of-rustic-spaghetti-dish-with-fresh-basil-and-cheese.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Sushi", image: "https://images.pexels.com/photos/359993/pexels-photo-359993.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Tacos", image: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ];

  return (
    <div className="container mt-4 text-center">
      {/* Hero Section */}
      <section className="hero-section py-5 text-white rounded shadow">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="fw-bold">
          🍽️ Welcome to Recipe Hub! 🍽️
        </motion.h1>
        <p className="lead">Explore, create, and enjoy delicious recipes from around the world.</p>

        {/* Get Started Button */}
        <motion.button 
          whileHover={{ scale: 1.1 }} 
          className="btn btn-warning mt-3"
          onClick={() => navigate("/register")} // Navigate to Register Page
        >
          Get Started
        </motion.button>
      </section>

      {/* Why Choose Us Section */}
      <section className="mt-5">
        <h2 className="text-dark fw-bold">Why Choose Us?</h2>
        <div className="row mt-4">
          <div className="col-md-4">
            <motion.div whileHover={{ scale: 1.05 }} className="card p-4 shadow border-0" style={{ background: "#ffebcc" }}>
              <h4>🍴 Tasty & Easy Recipes</h4>
              <p>Find a variety of simple yet delicious recipes to try at home.</p>
            </motion.div>
          </div>

          {/* Share Your Passion - Clickable Card */}
          <div className="col-md-4">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="card p-4 shadow border-0" 
              style={{ background: "#cce5ff", cursor: "pointer" }} 
              onClick={() => navigate("/Add")} // Navigate to Add Recipe Page
            >
              <h4>📢 Share Your Passion</h4>
              <p>Show off your cooking skills and share your favorite recipes.</p>
            </motion.div>
          </div>

          <div className="col-md-4">
            <motion.div whileHover={{ scale: 1.05 }} className="card p-4 shadow border-0" style={{ background: "#fde2e2" }}>
              <h4>👨‍🍳 Join Our Community</h4>
              <p>Be part of a food-loving community and get inspired daily.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <h3 className="text-dark fw-bold mt-5">See Our Cuisine</h3>
      <p className="text-muted">Discover some of our flavorful creations. Join us to unlock more!</p>
      <div className="row mt-3">
        {sampleRecipes.map((recipe, index) => (
          <div className="col-md-3 mb-4" key={index}>  
            <motion.div whileHover={{ scale: 1.05 }} className="card shadow border-0">
              <img src={recipe.image} className="card-img-top recipe-image rounded" alt={recipe.name} />
              <div className="card-body">
                <h5 className="card-title text-dark text-center">{recipe.name}</h5>
                <p className="text-muted text-center">A delicious treat waiting for you!</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Contact Information Section */}
      <footer className="mt-5 py-4 text-white text-center shadow rounded" style={{ background: "#1e1e1e" }}>
        <h4 className="text-warning">📞 Contact Us</h4>
        <p>Email: <a href="mailto:support@recipehub.com" className="text-white">kaizomd@gmail.com</a></p>
        <p>Phone: <a href="tel:+1234567890" className="text-white">+123 456 7890</a></p>
        <p>Follow us on social media for more amazing recipes!</p>
      </footer>
    </div>
  );
};

export default Home;
