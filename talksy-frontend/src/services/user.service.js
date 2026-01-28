import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

/**
 * Get logged-in user's profile
 */
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Setup / Update user profile (display name, bio, avatar)
 */
export const setupUserProfile = async (profileData) => {
  const token = localStorage.getItem("token");

  return axios.post(`${API_URL}/profile-setup`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
