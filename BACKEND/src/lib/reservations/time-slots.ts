import { Op } from "sequelize";
import Reservation from "../../models/reservation";
import { RESTAURANT_CONFIG } from "../../config/restaurant";

export async function isTimeSlotAvailable(date: Date): Promise<boolean> {
  const hourStart = new Date(date);
  hourStart.setMinutes(0, 0, 0);

  const hourEnd = new Date(hourStart);
  hourEnd.setHours(hourStart.getHours() + 1);

  // Verificar si está dentro del horario del restaurante
  const hour = date.getHours();
  const { shifts } = RESTAURANT_CONFIG;

  const isLunchTime = hour >= shifts.lunch.start && hour < shifts.lunch.end;
  const isDinnerTime = hour >= shifts.dinner.start && hour < shifts.dinner.end;

  if (!isLunchTime && !isDinnerTime) {
    return false;
  }

  // Contar reservas activas en la misma hora
  const reservationsCount = await Reservation.count({
    where: {
      date: {
        [Op.gte]: hourStart,
        [Op.lt]: hourEnd,
      },
      status: {
        [Op.notIn]: ["cancelada", "finalizada"],
      },
    },
  });

  // Verificar si hay espacio disponible
  return reservationsCount < RESTAURANT_CONFIG.maxReservationsPerHour;
}

export async function findNextAvailableSlot(
  date: Date,
  guests: number,
): Promise<Date | null> {
  const { shifts, interval } = RESTAURANT_CONFIG;
  const maxAttempts = 48; // Buscar en las próximas 48 horas
  let attempts = 0;
  let currentDate = new Date(date);

  while (attempts < maxAttempts) {
    currentDate = new Date(currentDate.getTime() + interval * 60000);

    // Saltar al siguiente día si estamos fuera del horario de cena
    if (currentDate.getHours() >= shifts.dinner.end) {
      currentDate.setDate(currentDate.getDate() + 1);
      currentDate.setHours(shifts.lunch.start, 0, 0, 0);

      // Saltar lunes (día de descanso)
      if (currentDate.getDay() === 1) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    const hour = currentDate.getHours();
    const isLunchTime = hour >= shifts.lunch.start && hour < shifts.lunch.end;
    const isDinnerTime =
      hour >= shifts.dinner.start && hour < shifts.dinner.end;

    // Saltar horarios fuera de servicio
    if (!isLunchTime && !isDinnerTime) {
      if (hour < shifts.lunch.start) {
        currentDate.setHours(shifts.lunch.start, 0, 0, 0);
      } else if (hour < shifts.dinner.start) {
        currentDate.setHours(shifts.dinner.start, 0, 0, 0);
      }
      continue;
    }

    if (await isTimeSlotAvailable(currentDate)) {
      return currentDate;
    }

    attempts++;
  }

  return null;
}
