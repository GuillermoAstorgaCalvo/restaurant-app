export function validateGuestsCount(guests: number): {
  valid: boolean;
  error?: string;
} {
  if (!Number.isInteger(guests)) {
    return {
      valid: false,
      error: "El número de comensales debe ser un número entero",
    };
  }

  if (guests < 1) {
    return {
      valid: false,
      error: "El número de comensales debe ser al menos 1",
    };
  }

  if (guests > 10) {
    return {
      valid: false,
      error:
        "Para grupos mayores a 10 personas, por favor contáctenos directamente",
    };
  }

  return { valid: true };
}
