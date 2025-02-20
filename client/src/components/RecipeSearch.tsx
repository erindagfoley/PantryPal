import React, { useState, useEffect } from "react";
import { fetchRecipes, Recipe } from "../api/api";
import "../components/RecipeSearch.css";


const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Create and append Google Fonts link dynamically
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Chicle&display=swap", "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link); // Cleanup when component unmounts
    };
  }, []);

  const handleSearch = async () => {
    try {
      const results = await fetchRecipes(searchQuery);
      setRecipes(results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="recipe-list-container">
      <div className="search-bar-container">
        <div className="container d-flex justify-content-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for recipes..."
            className="form-control me-2"
            style={{ maxWidth: "300px" }}
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      </div>

      {/* Recipe List */}
      <div className="container" style={{ marginTop: "80px" }}>
        <div className="row justify-content-center">
          {recipes.map((recipe) => (
            <div className="col-md-3 mb-4" key={recipe.id}>
              <div className="card h-100 recipe-card">
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
    </div>
  );
};

export default RecipeList;
