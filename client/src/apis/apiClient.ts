import axios from "axios";

axios.defaults.withCredentials = true;

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default apiClient;
