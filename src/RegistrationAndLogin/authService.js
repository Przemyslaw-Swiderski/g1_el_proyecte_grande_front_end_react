// authService.js
import axios from 'axios';

const baseURL = 'http://localhost:8081'; // Update with your server URL

// Function to authenticate and get access and refresh tokens
export async function login(username, password) {
  try {
    const response = await axios.post(`${baseURL}/login`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to refresh the access token using the refresh token
export async function refreshAccessToken(refreshToken) {
  try {
    const response = await axios.post(`${baseURL}/refreshToken`, {
      refreshToken,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
