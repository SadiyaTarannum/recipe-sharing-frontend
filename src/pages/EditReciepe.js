import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // For API requests

const EditRecipe = () => {
  const { id } = useParams(); // Get recipe ID from the URL
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null); // Store original recipe data
  const [updatedRecipe, setUpdatedRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    image: "",
  });

  // Fetch existing recipe details
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(response.data);
        setUpdatedRecipe({
          title: response.data.title,
          description: response.data.description,
          ingredients: response.data.ingredients.join(", "), // Convert array to comma-separated string
          image: response.data.image,
        });
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecipe((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/recipes/${id}`, {
        ...updatedRecipe,
        ingredients: updatedRecipe.ingredients.split(",").map((item) => item.trim()), // Convert back to array
      });

      navigate("/"); // Redirect to home after update
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Recipe</h2>
      {recipe ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Recipe Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={updatedRecipe.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={updatedRecipe.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Ingredients (comma separated)</label>
            <input
              type="text"
              className="form-control"
              name="ingredients"
              value={updatedRecipe.ingredients}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              name="image"
              value={updatedRecipe.image}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditRecipe;
