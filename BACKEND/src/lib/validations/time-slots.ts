import { RESTAURANT_CONFIG } from "../../config/restaurant";

export function validateTimeSlot(date: Date) {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const { shifts, interval } = RESTAURANT_CONFIG;

  const isLunchTime = hour >= shifts.lunch.start && hour < shifts.lunch.end;
  const isDinnerTime = hour >= shifts.dinner.start && hour < shifts.dinner.end;

  if (!isLunchTime && !isDinnerTime) {
    const lunchHours = `${shifts.lunch.start}:00 a ${shifts.lunch.end}:00`;
    const dinnerHours = `${shifts.dinner.start}:00 a ${shifts.dinner.end}:00`;
    return {
      valid: false,
      error: `Horario fuera de servicio. Horarios disponibles: Comidas de ${lunchHours}, Cenas de ${dinnerHours}`,
    };
  }

  if (minutes % interval !== 0) {
    return {
      valid: false,
      error: `Las reservas solo pueden hacerse en intervalos de ${interval} minutos`,
    };
  }

  return { valid: true };
}
