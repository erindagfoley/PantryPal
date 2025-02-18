//created by erin
import React, { useState } from "react";
import { fetchRecipes, Recipe } from "../api/api"; // Import Recipe type

const RecipeSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]); // ✅ Use Recipe[] instead of any[]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecipes(query);
      setRecipes(data);
    } catch (err) {
      setError("Failed to fetch recipes");
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search for recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleSearch}
        className="ml-2 bg-blue-500 text-white p-2 rounded"
      >
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="mt-4">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="p-2 border-b">
            <img src={recipe.image} alt={recipe.title} className="w-16 h-16" />
            {recipe.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeSearch;
