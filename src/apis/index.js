import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api`, // Change to your API base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authorization headers or other modifications here
    // Example: config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle response data here if needed
    return response;
  },
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);