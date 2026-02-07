import axios from "axios";
const API_URL = "http://localhost:5000/api/posts";
export const getHomeFeed = async () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API_URL}/feed`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
