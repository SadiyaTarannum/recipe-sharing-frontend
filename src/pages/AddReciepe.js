import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function CreateRecipe() {
  // Field States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");

  // Step State (controls visibility of fields)
  const [step, setStep] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Submitting Recipe...");

    const ingredientsArray = ingredients.split(",").map((item) => item.trim());

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      alert("⚠️ You are not logged in. Please log in to create a recipe.");
      return;
    }

    const recipeData = {
      title,
      description,
      category: "Uncategorized", // ✅ Default category added
      ingredients: ingredientsArray,
      instructions,
      time,
      image,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/recipes", recipeData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });

      console.log("✅ Recipe Created:", response.data);
      alert("🎉 Recipe created successfully!");
      navigate("/recipes"); // Redirect to recipes list after success
    } catch (error) {
      console.error("❌ Error creating recipe:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error creating recipe");
    }
  };

  // Helper function to move to the next step
  const goNextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    }
  };

  return (
    <div className="create-recipe-container d-flex justify-content-center align-items-start">
      <div className="create-recipe-box shadow">
        <h2 className="mb-4 text-center form-heading">🍽️ Create a New Recipe</h2>

        <form onSubmit={handleSubmit}>
          {/* STEP 0: TITLE */}
          {step >= 0 && (
            <div className="mb-3">
              <label className="form-label fw-bold">Recipe Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter recipe title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          )}

          {/* STEP 1: DESCRIPTION */}
          {step >= 1 && (
            <div className="mb-3">
              <label className="form-label fw-bold">Short Description</label>
              <textarea
                className="form-control"
                placeholder="Briefly describe your recipe"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
          )}

          {/* STEP 2: INGREDIENTS */}
          {step >= 2 && (
            <div className="mb-3">
              <label className="form-label fw-bold">Ingredients (comma separated)</label>
              <textarea
                className="form-control"
                placeholder="e.g. flour, sugar, eggs"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              ></textarea>
            </div>
          )}

          {/* STEP 3: INSTRUCTIONS */}
          {step >= 3 && (
            <div className="mb-3">
              <label className="form-label fw-bold">Instructions</label>
              <textarea
                className="form-control"
                placeholder="Describe the preparation steps"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
              ></textarea>
            </div>
          )}

          {/* STEP 4: COOKING TIME */}
          {step >= 4 && (
            <div className="mb-3">
              <label className="form-label fw-bold">Cooking Time (minutes)</label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 30"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          )}

          {/* STEP 5: IMAGE URL & PREVIEW */}
          {step >= 5 && (
            <div className="mb-3">
              <label className="form-label fw-bold">Image URL (optional)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Paste an image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              {image && (
                <div className="mt-3 text-center">
                  <img src={image} alt="Recipe Preview" className="img-preview" />
                </div>
              )}
            </div>
          )}

          {/* STEP 6: SUBMIT BUTTON */}
          {step >= 6 && (
            <button type="submit" className="btn btn-primary w-100 mt-3 create-btn">
              ✅ Create Recipe
            </button>
          )}

          {/* NEXT BUTTON */}
          {step < 6 && (
            <button
              type="button"
              className="btn btn-secondary w-100 mt-3 next-btn"
              onClick={goNextStep}
            >
              Next ➡️
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;
