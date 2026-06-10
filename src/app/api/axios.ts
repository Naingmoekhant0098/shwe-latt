import axios from "axios";
import { getCookie, removeCookie } from "typescript-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_IS_PRODUCTION
    ? import.meta.env.VITE_APP_PRODUCTION_URL
    : import.meta.env.VITE_APP_UAT_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      removeCookie("token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
