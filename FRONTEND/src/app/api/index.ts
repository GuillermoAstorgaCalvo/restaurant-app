import axios from "axios";

// Configure the base Axios instance
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5 seconds timeout for API calls
});

export default api;
