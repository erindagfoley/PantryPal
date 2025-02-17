import { useState } from "react";
import { searchRecipes } from "../api/recipeAPI";

interface Recipe {
    id: number;
    title: string;
}

function RecipeSearch() {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const handleSearch = async () => {
        try {
            const response = await searchRecipes(query);
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    return (
        <div>
            <h2>Recipe Search</h2>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>{recipe.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeSearch;
