import { useState } from "react";

type ErrorType = "validation" | "availability" | "server" | "network";

interface ErrorState {
  type: ErrorType;
  message: string;
  field?: string;
  details?: unknown;
}

interface ZodError {
  name: "ZodError";
  errors: { message: string; path: string[] }[];
}

interface ServerErrorResponse {
  response?: {
    data?: {
      error?: string;
    };
  };
}

export function useReservationErrors() {
  const [error, setError] = useState<ErrorState | null>(null);

  const isZodError = (error: unknown): error is ZodError =>
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as ZodError).name === "ZodError" &&
    Array.isArray((error as ZodError).errors);

  const handleError = (error: ZodError | ServerErrorResponse | Error) => {
    if (isZodError(error)) {
      setError({
        type: "validation",
        message: error.errors[0]?.message ?? "Validation error occurred.",
        field: error.errors[0]?.path[0] ?? undefined,
      });
    } else if ("response" in error && error.response?.data?.error) {
      setError({
        type: "server",
        message: error.response?.data?.error ?? "Unknown server error.",
        details: error.response?.data,
      });
    } else if ("message" in error && error.message === "Network Error") {
      setError({
        type: "network",
        message:
          "Error de conexión. Por favor, verifica tu conexión a internet.",
      });
    } else if ("message" in error) {
      setError({
        type: "server",
        message:
          error.message ?? "Error inesperado. Por favor, inténtalo de nuevo.",
      });
    } else {
      setError({
        type: "server",
        message: "Error inesperado. Por favor, inténtalo de nuevo.",
      });
    }
  };

  const clearError = () => setError(null);

  return {
    error,
    handleError,
    clearError,
  };
}
