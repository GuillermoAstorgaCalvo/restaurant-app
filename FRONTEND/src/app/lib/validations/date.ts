import { RESTAURANT_CONFIG } from "@/app/lib/constants/restaurant";

export function validateDate(date: Date): { valid: boolean; error?: string } {
  const now = new Date();
  const minDateTime = new Date(
    now.getTime() +
      RESTAURANT_CONFIG.reservations.minHoursInAdvance * 60 * 60 * 1000
  );
  const maxDateTime = new Date();
  maxDateTime.setDate(now.getDate() + 30); // Maximum 30 days in advance

  if (date < now) {
    return {
      valid: false,
      error: "No se pueden hacer reservas para fechas pasadas",
    };
  }
  if (date < minDateTime) {
    return {
      valid: false,
      error: `Las reservas deben hacerse con al menos ${RESTAURANT_CONFIG.reservations.minHoursInAdvance} horas de anticipación`,
    };
  }
  if (date > maxDateTime) {
    return {
      valid: false,
      error: `Las reservas solo pueden hacerse con hasta 30 días de anticipación`,
    };
  }
  return { valid: true };
}
