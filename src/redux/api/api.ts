import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: url,
  /*  headers: {
      "Content-Type": "application/json",
    },*/
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const errorMessage = error.response.data.message || "Errore sconosciuto.";
    console.error("Response error: " + errorMessage);
    return Promise.reject(error);
  }
);

export default api;
