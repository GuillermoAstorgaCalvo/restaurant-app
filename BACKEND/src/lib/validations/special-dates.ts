// Días festivos y eventos especiales
const SPECIAL_DATES = new Set([
  "2024-12-24", // Nochebuena
  "2024-12-25", // Navidad
  "2024-12-31", // Nochevieja
  "2025-01-01", // Año Nuevo
]);

// Días de cierre del restaurante
const CLOSED_DATES = new Set([
  "2024-01-01", // Año Nuevo
  "2024-12-25", // Navidad
]);

export function validateSpecialDates(date: Date) {
  const dateString = date.toISOString().split("T")[0];

  // Verificar día de cierre
  if (CLOSED_DATES.has(dateString)) {
    return {
      valid: false,
      error: "El restaurante permanecerá cerrado en esta fecha",
    };
  }

  // Verificar día especial
  if (SPECIAL_DATES.has(dateString)) {
    return {
      valid: false,
      error:
        "Esta fecha requiere reserva especial, por favor contáctenos directamente",
    };
  }

  // Verificar que no sea lunes (día de descanso)
  if (date.getDay() === 1) {
    return {
      valid: false,
      error: "El restaurante permanece cerrado los lunes",
    };
  }

  return { valid: true };
}
