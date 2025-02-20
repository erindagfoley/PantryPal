import React, { useState } from "react";
import { fetchRecipes, Recipe } from "../api/api";
import "../components/RecipeSearch.css";

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const results = await fetchRecipes(searchQuery);
      setRecipes(results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="container">
      {/* Search Bar and Button at Top Left */}
      <div className="d-flex mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for recipes..."
          className="form-control me-2"
          style={{ maxWidth: "300px" }} // Optional: Limit the width of the search bar
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {/* Recipe Cards Grid - Centered */}
      <div className="row justify-content-center"> {/* Center the columns */}
        {recipes.map((recipe) => (
          <div className="col-md-3 mb-4" key={recipe.id}>
            <div className="card h-100 recipe-card">
              {/* Image Container */}
              <div className="card-img-container">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="card-img-top recipe-image"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <a
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View Recipe
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;