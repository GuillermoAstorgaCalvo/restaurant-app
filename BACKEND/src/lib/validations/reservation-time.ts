import { RESTAURANT_CONFIG } from "../../config/restaurant";

const MIN_ADVANCE_HOURS = RESTAURANT_CONFIG.minHoursInAdvance;
const MAX_ADVANCE_DAYS = 30;

export function validateReservationTime(date: Date): {
  valid: boolean;
  error?: string;
} {
  const now = new Date();
  const minDateTime = new Date(
    now.getTime() + MIN_ADVANCE_HOURS * 60 * 60 * 1000,
  );

  if (date < now) {
    return {
      valid: false,
      error: "No se pueden hacer reservas para fechas pasadas",
    };
  }

  if (date < minDateTime) {
    return {
      valid: false,
      error: `Las reservas deben hacerse con al menos ${MIN_ADVANCE_HOURS} ${
        Number(MIN_ADVANCE_HOURS) === 1 ? "hora" : "horas"
      } de anticipación`,
    };
  }

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + MAX_ADVANCE_DAYS);
  if (date > maxDate) {
    return {
      valid: false,
      error: `Las reservas solo pueden hacerse con hasta ${MAX_ADVANCE_DAYS} días de anticipación`,
    };
  }

  return { valid: true };
}
