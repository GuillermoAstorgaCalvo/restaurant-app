import { CLOSED_DATES, SPECIAL_DATES } from "@/config/restaurant";

export function validateSpecialDates(date: Date) {
  const dateString = date.toISOString().split("T")[0];

  if (CLOSED_DATES.has(dateString)) {
    return {
      valid: false,
      error: "El restaurante permanecerá cerrado en esta fecha",
    };
  }

  if (SPECIAL_DATES.has(dateString)) {
    return {
      valid: false,
      error:
        "Esta fecha requiere reserva especial, por favor contáctenos directamente",
    };
  }

  if (date.getDay() === 1) {
    return {
      valid: false,
      error: "El restaurante permanece cerrado los lunes",
    };
  }

  return { valid: true };
}
