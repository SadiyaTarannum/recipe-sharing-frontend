import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./RecipesPage.css";


const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Search term state
  const [updateTrigger, setUpdateTrigger] = useState(0); // 🔥 New state for tracking DB changes

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://recipe-backend-5apy.onrender.com/api/recipes");
        setRecipes(response.data);
      } catch (error) {
        setError("Failed to fetch recipes. Please try again.");
        console.error("Error fetching recipes:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [updateTrigger]); // 🔥 Runs when `updateTrigger` changes

  // 🔄 Auto-refresh recipes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateTrigger((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval); // Cleanup to prevent memory leaks
  }, []);

  // Filter recipes based on search term
  const filteredRecipes = recipes.filter((recipe) =>
    (recipe.title && recipe.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (recipe.category && recipe.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary">📖 All Recipes</h2>

      {/* Search Bar */}
      <div className="mb-4 text-center">
        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </div>

      {loading && <p className="text-center">Loading recipes...</p>}
      {error && <p className="alert alert-danger">{error}</p>}

      <div className="row">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe._id}>
              <div className="card shadow">
                <img
                  src={recipe.image}
                  className="card-img-top"
                  alt={recipe.title}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{recipe.title}</h5>
                  <p className="text-muted">{recipe.category}</p>
                  <Link to={`/recipe/${recipe._id}`} className="btn btn-success">
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
