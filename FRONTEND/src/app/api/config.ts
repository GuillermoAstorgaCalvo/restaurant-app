import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined in the .env file");
}

export const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});
