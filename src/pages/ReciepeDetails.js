import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams(); // Get Recipe ID from URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        console.log(`Fetching recipe: ${id}`); // Debugging
        const response = await fetch(`https://recipe-backend-5apy.onrender.com/api/recipes/${id}`);

        if (!response.ok) {
          throw new Error("Recipe not found");
        }

        const data = await response.json();
        console.log("Recipe Data:", data); // Debugging
        setRecipe(data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p className="text-center">Loading recipe details...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center">{recipe.title}</h2>
      <h5>Category: {recipe.category}</h5>
      <h6>Ingredients:</h6>
      <ul>
        {recipe.ingredients?.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>
      <h6>Instructions:</h6>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetails;
