import { useState } from "react";
import { searchRecipes } from "../api/recipeAPI.js";
import "./RecipeSearch.css";

interface Recipe {
  id: number;
  title: string;
  image: string;
}

function RecipeSearch() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent empty searches
    try {
      const response = await searchRecipes(query);
      setRecipes(response.data);
      setError(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError(true);
    }
  };

  return (
    <div className="recipe-search-container">
      <h2 className="title">Find Your Next Meal 🍽️</h2>

      {/* Search Form */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      {error && <p className="error-text">Something went wrong. Try again!</p>}

      {/* Recipe Results */}
      <div className="recipe-results">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image || "https://via.placeholder.com/150"} alt={recipe.title} />
              <h3>{recipe.title}</h3>
            </div>
          ))
        ) : (
          <p className="no-results">Start searching for recipes!</p>
        )}
      </div>
    </div>
  );
}

export default RecipeSearch;
