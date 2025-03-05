import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // For API requests

const EditRecipe = () => {
  const { id } = useParams(); // Get recipe ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const [updatedRecipe, setUpdatedRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    image: "",
  });

  // Fetch existing recipe details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
        setUpdatedRecipe({
          title: response.data.title,
          description: response.data.description,
          ingredients: response.data.ingredients.join(", "), // Convert array to string
          image: response.data.image,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      });
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setUpdatedRecipe({ ...updatedRecipe, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/recipes/${id}`, {
        ...updatedRecipe,
        ingredients: updatedRecipe.ingredients.split(",").map((ing) => ing.trim()), // Convert string back to array
      });
      navigate(`/recipe/${id}`); // Redirect to the updated recipe page
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  if (loading) return <h2 className="text-center">Loading...</h2>;

  return (
    <div className="container mt-4">
      <h2 className="text-center">Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
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
          <label className="form-label">Ingredients (comma-separated)</label>
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
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success">
            ✅ Save Changes
          </button>
          <button type="button" className="btn btn-secondary mx-2" onClick={() => navigate(`/recipe/${id}`)}>
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;
