import axios from "axios";

export interface Recipe {
  id: number;
  title: string;
  image: string;
  sourceUrl: string; 
}

const API_KEY = "f9d347f96b944bdab51ea58c292c8aa9";
const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

export const fetchRecipes = async (query: string): Promise<Recipe[]> => {
  try {
    const response = await axios.get<{ results: Recipe[] }>(BASE_URL, {
      params: {
        apiKey: API_KEY,
        query: query,
        number: 10,
        addRecipeInformation: true, // Include additional recipe information
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
