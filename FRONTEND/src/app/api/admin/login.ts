import { api } from "../config"; // Import axios instance
import { AxiosError } from "axios"; // Import AxiosError type

export async function loginAdmin(email: string, password: string) {
  try {
    const response = await api.post<{
      token: string;
      admin: { id: number; name: string; email: string; role: string };
    }>("/admin/login", { email, password });

    // Return the token and admin data if successful
    return response.data;
  } catch (error: unknown) {
    // Check if the error is an AxiosError
    if (error instanceof AxiosError) {
      // If it's an AxiosError, handle it and return the response error message
      throw new Error(
        error.response?.data?.error || "Login failed. Invalid credentials.",
      );
    }

    // If it's some other kind of error, just throw a generic error
    throw new Error("An unexpected error occurred.");
  }
}
