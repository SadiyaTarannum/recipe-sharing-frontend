import { useLocation, Link } from "react-router-dom";

const RecipeDetails = ({ isAuthenticated }) => {  // Receive auth status as a prop
  const location = useLocation();
  const recipe = location.state?.recipe;

  if (!recipe) {
    return <h2 className="text-center">Recipe not found</h2>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary">{recipe.title}</h2>
      <img src={recipe.image} className="img-fluid d-block mx-auto" alt={recipe.title} />
      <p className="mt-3">{recipe.description}</p>
      <h5>Ingredients:</h5>
      <ul>{recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>
      <h5>Steps:</h5>
      <ol>{recipe.steps.map((step, index) => <li key={index}>{step}</li>)}</ol>

      {/* View Recipe Button */}
      <div className="text-center mt-3">
        <Link to={`/recipe/${recipe.id}`} state={{ recipe }} className="btn btn-success">
          🍽 View Recipe
        </Link>
        
        {/* Show Edit Button Only If Logged In */}
        {isAuthenticated && (
          <Link to={`/edit/${recipe.id}`} state={{ recipe }} className="btn btn-warning mx-2">
            ✏️ Edit Recipe
          </Link>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
