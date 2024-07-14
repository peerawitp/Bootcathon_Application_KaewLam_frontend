import axios from "axios";
import { useLineStore } from "@/stores/lineStore";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const mapApiInstance = axios.create({
  baseURL: import.meta.env.VITE_MAP_API,
  headers: {},
  timeout: 1000,
});

apiInstance.interceptors.request.use(
  (config) => {
    const { idToken } = useLineStore.getState();
    if (idToken) {
      config.headers["Authorization"] = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { apiInstance, mapApiInstance };
