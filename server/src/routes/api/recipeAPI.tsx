import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001/api";

export const searchRecipes = async (query: string) => {
  return axios.get(`${API_URL}/recipes/search`, { params: { query } });
};

export const getIngredients = async (recipeId: number) => {
  return axios.get(`${API_URL}/recipes/${recipeId}/ingredients`);
};