import React, { useState, useEffect } from "react";
import Reciepes from "../components/Reciepes"; // Static list of recipes (replace with API call later)
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar"; // Import SearchBar

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [filteredRecipes, setFilteredRecipes] = useState(Reciepes); // State for filtered recipes
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); // Check login status

  // UseEffect hook to filter recipes whenever the searchTerm changes
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredRecipes(Reciepes); // If searchTerm is empty, show all recipes
    } else {
      const filtered = Reciepes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredRecipes(filtered); // Set filtered recipes
    }
  }, [searchTerm]);

  const handleRecipeClick = (id) => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      navigate(`/recipe/${id}`); // Go to recipe details page
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-danger animate__animated animate__bounce">
        🍲 Delicious Recipes
      </h2>

      {/* Search Bar Component */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Breakfast Section */}
      <h3 className="text-primary mt-4">🥞 Breakfast</h3>
      <div className="row">
        {filteredRecipes
          .filter((recipe) => recipe.category === "Breakfast")
          .map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe.id}>
              <div className="card shadow animate__animated animate__fadeInUp">
                <img src={recipe.image} className="card-img-top recipe-image" alt={recipe.title} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{recipe.title}</h5>
                  <button className="btn btn-success" onClick={() => handleRecipeClick(recipe.id)}>
                    View Recipe
                  </button>
                  {/* Edit button visible only if logged in */}
                  {isLoggedIn && (
                    <Link to={`/edit/${recipe.id}`} className="btn btn-warning mx-2">
                      ✏️ Edit
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Main Course Section */}
      <h3 className="text-danger mt-4">🍛 Main Course</h3>
      <div className="row">
        {filteredRecipes
          .filter((recipe) => recipe.category === "Main Course")
          .map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe.id}>
              <div className="card shadow animate__animated animate__fadeInUp">
                <img src={recipe.image} className="card-img-top recipe-image" alt={recipe.title} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{recipe.title}</h5>
                  <button className="btn btn-success" onClick={() => handleRecipeClick(recipe.id)}>
                    View Recipe
                  </button>
                  {/* Edit button visible only if logged in */}
                  {isLoggedIn && (
                    <Link to={`/edit/${recipe.id}`} className="btn btn-warning mx-2">
                      ✏️ Edit
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* Indian Flatbreads*/}
      <h3 className="text-primary mt-4">🌾Indian Flatbreads</h3>
      <div className="row">
        {filteredRecipes
          .filter((recipe) => recipe.category === "Indian Flatbreads")
          .map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe.id}>
              <div className="card shadow animate__animated animate__fadeInUp">
                <img src={recipe.image} className="card-img-top recipe-image" alt={recipe.title} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{recipe.title}</h5>
                  <button className="btn btn-success" onClick={() => handleRecipeClick(recipe.id)}>
                    View Recipe
                  </button>
                  {/* Edit button visible only if logged in */}
                  {isLoggedIn && (
                    <Link to={`/edit/${recipe.id}`} className="btn btn-warning mx-2">
                      ✏️ Edit
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* Fast and comfort food*/}
      <h3 className="text-primary mt-4">🍕Fast & Comfort Foods</h3>
      <div className="row">
        {filteredRecipes
          .filter((recipe) => recipe.category === "Fast & Comfort Foods")
          .map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe.id}>
              <div className="card shadow animate__animated animate__fadeInUp">
                <img src={recipe.image} className="card-img-top recipe-image" alt={recipe.title} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{recipe.title}</h5>
                  <button className="btn btn-success" onClick={() => handleRecipeClick(recipe.id)}>
                    View Recipe
                  </button>
                  {/* Edit button visible only if logged in */}
                  {isLoggedIn && (
                    <Link to={`/edit/${recipe.id}`} className="btn btn-warning mx-2">
                      ✏️ Edit
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* Italian Cuisines*/}
      <h3 className="text-primary mt-4">🍝Italian Cuisines</h3>
      <div className="row">
        {filteredRecipes
          .filter((recipe) => recipe.category === "Italian Cuisines")
          .map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe.id}>
              <div className="card shadow animate__animated animate__fadeInUp">
                <img src={recipe.image} className="card-img-top recipe-image" alt={recipe.title} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{recipe.title}</h5>
                  <button className="btn btn-success" onClick={() => handleRecipeClick(recipe.id)}>
                    View Recipe
                  </button>
                  {/* Edit button visible only if logged in */}
                  {isLoggedIn && (
                    <Link to={`/edit/${recipe.id}`} className="btn btn-warning mx-2">
                      ✏️ Edit
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>    
    </div>
  );
};

export default Home;
