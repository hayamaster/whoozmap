import axios from "axios";

axios.defaults.withCredentials = true;

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  // baseURL: "http://172.16.224.230:5173",
});

export default apiClient;
