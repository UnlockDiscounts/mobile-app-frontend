import axios from "axios";

const api = axios.create({
  baseURL: "https://mobile-app-backend-1-ntir.onrender.com/api",
  //baseURL: "http://localhost:3000/api",
  withCredentials: true, // if using cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
