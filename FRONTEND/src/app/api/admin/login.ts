import { api } from "../config";
import { AxiosError } from "axios";

export async function loginAdmin(email: string, password: string) {
  try {
    const response = await api.post<{
      token: string;
      admin: { id: number; name: string; email: string; role: string };
    }>("/admin/login", { email, password });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.error ||
          "Inicio de sesión fallido. Credenciales inválidas",
      );
    }

    throw new Error("Algo ha salido mal. Por favor, inténtalo de nuevo.");
  }
}
