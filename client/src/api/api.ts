//created by erin
import axios from "axios";

// Define the Recipe interface
export interface Recipe {
  id: number;
  title: string;
  image: string;
  // Add other properties as needed based on the API response
}

const API_KEY = "f9d347f96b944bdab51ea58c292c8aa9"; //erin's api key to change for mvp
const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

// Update the fetchRecipes function to return a Promise of Recipe array
export const fetchRecipes = async (query: string): Promise<Recipe[]> => {
  try {
    const response = await axios.get<{ results: Recipe[] }>(BASE_URL, {
      params: {
        apiKey: API_KEY,
        query: query,
        number: 10, // Limit results
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
