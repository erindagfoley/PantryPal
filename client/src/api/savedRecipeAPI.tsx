import axios from "axios";
import process from "process";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001/api";

// Save a recipe
export const addSavedRecipe = async (recipe: { id: number; title: string; image: string }) => {
  return axios.post(`${API_URL}/saved-recipes`, recipe, {
    headers: { "Content-Type": "application/json" },
  });
};

// Get all saved recipes
export const getSavedRecipes = async () => {
  return axios.get(`${API_URL}/saved-recipes`);
};

// Delete a saved recipe
export const deleteSavedRecipe = async (recipeId: number) => {
  return axios.delete(`${API_URL}/saved-recipes/${recipeId}`);
};
