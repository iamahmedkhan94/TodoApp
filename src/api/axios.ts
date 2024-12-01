import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppGV from "../utils/AppGV";

const API = axios.create({
  baseURL: AppGV.BASE_URL, // Replace with your backend's base URL
  headers: {
    "Content-Type": "application/json", // Default Content-Type for all requests
  },
});

// Add a request interceptor for handling tokens
API.interceptors.request.use(
  async (config) => {
    const csrfToken = await AsyncStorage.getItem("csrfToken");
    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Forward request errors
  }
);

// Add a response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if error is a server error or network error
    if (error.response) {
      // Server responded with a status code out of range 2xx
      const { status, data } = error.response;
      console.error(`[API Error] Status: ${status}, Data: ${JSON.stringify(data)}`);
    } else if (error.request) {
      // No response received from server
      console.error("[API Error] No response received from server");
    } else {
      // Client-side error
      console.error(`[API Error] ${error.message}`);
    }

    // Optionally, you can transform errors to a consistent structure
    return Promise.reject(error);
  }
);

export default API;
