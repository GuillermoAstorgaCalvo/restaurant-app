import { useState } from "react";
import { ZodError, ZodSchema } from "zod";

interface ValidationError {
  field: string;
  message: string;
}

export function useValidation() {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validate = async <T>(
    schema: ZodSchema<T>,
    data: T,
  ): Promise<boolean> => {
    try {
      await schema.parseAsync(data);
      setErrors([]);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(
          error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        );
      }
      return false;
    }
  };

  const clearErrors = () => setErrors([]);

  const clearError = (field: string) => {
    setErrors((prev) => prev.filter((error) => error.field !== field));
  };

  return {
    errors,
    validate,
    clearErrors,
    clearError,
  };
}
