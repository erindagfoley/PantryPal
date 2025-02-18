import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001/api";

export const getGroceryLists = async (token: string) => {
  return axios.get(`${API_URL}/grocery`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addGroceryList = async (name: string, token: string) => {
  return axios.post(
    `${API_URL}/grocery`,
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const deleteGroceryList = async (id: string, token: string) => {
  return axios.delete(`${API_URL}/grocery/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
