import axios from "axios";

// Create a singleton Axios instance
const axiosInstance = axios.create({
  baseURL: "/api", // Default API base URL
  timeout: 10000, // Set request timeout (optional)
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

// Add request interceptor (optional)

export default axiosInstance;
