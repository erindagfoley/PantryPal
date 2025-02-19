import React, { useState } from "react";
import { fetchRecipes, Recipe } from "../api/api";

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
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for recipes..."
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
              {recipe.title}
            </a>
            <img src={recipe.image} alt={recipe.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
