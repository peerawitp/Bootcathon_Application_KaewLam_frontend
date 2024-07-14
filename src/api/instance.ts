import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
});

const mapApiInstance = axios.create({
  baseURL: import.meta.env.VITE_MAP_API,
  headers: {},
  timeout: 1000,
});

export { apiInstance, mapApiInstance };