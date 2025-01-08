import { useState } from "react";
import { ZodError, ZodSchema } from "zod"; // Import ZodSchema for better typing

interface ValidationError {
  field: string;
  message: string;
}

export function useValidation() {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  // Define the schema and data types more explicitly
  const validate = async <T>(
    schema: ZodSchema<T>,
    data: T,
  ): Promise<boolean> => {
    try {
      await schema.parseAsync(data); // Validate data with the schema
      setErrors([]); // Clear previous errors if validation passes
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        // If validation fails, map the errors to the format we expect
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
