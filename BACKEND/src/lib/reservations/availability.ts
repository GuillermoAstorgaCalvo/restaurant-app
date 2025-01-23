import { Op } from "sequelize";
import Reservation from "../../models/reservation";
import { RESTAURANT_CONFIG } from "../../config/restaurant";
import { isTimeSlotAvailable } from "./time-slots";

export async function getHourlyAvailability(date: Date): Promise<{
  available: boolean;
  currentCount: number;
  maxCount: number;
}> {
  const hourStart = new Date(date);
  hourStart.setMinutes(0, 0, 0);

  const hourEnd = new Date(hourStart);
  hourEnd.setHours(hourStart.getHours() + 1);

  const currentCount = await Reservation.count({
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

  return {
    available: currentCount < RESTAURANT_CONFIG.maxReservationsPerHour,
    currentCount,
    maxCount: RESTAURANT_CONFIG.maxReservationsPerHour,
  };
}

export async function getDailyAvailability(date: Date): Promise<{
  lunch: { start: string; end: string; slots: string[] };
  dinner: { start: string; end: string; slots: string[] };
}> {
  const { shifts, interval } = RESTAURANT_CONFIG;
  const slots = {
    lunch: [] as string[],
    dinner: [] as string[],
  };

  for (let hour = shifts.lunch.start; hour < shifts.lunch.end; hour++) {
    for (let minutes = 0; minutes < 60; minutes += interval) {
      const slotDate = new Date(date);
      slotDate.setHours(hour, minutes, 0, 0);

      if (await isTimeSlotAvailable(slotDate)) {
        slots.lunch.push(
          `${hour.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`,
        );
      }
    }
  }

  for (let hour = shifts.dinner.start; hour < shifts.dinner.end; hour++) {
    for (let minutes = 0; minutes < 60; minutes += interval) {
      const slotDate = new Date(date);
      slotDate.setHours(hour, minutes, 0, 0);

      if (await isTimeSlotAvailable(slotDate)) {
        slots.dinner.push(
          `${hour.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`,
        );
      }
    }
  }

  return {
    lunch: {
      start: `${shifts.lunch.start}:00`,
      end: `${shifts.lunch.end}:00`,
      slots: slots.lunch,
    },
    dinner: {
      start: `${shifts.dinner.start}:00`,
      end: `${shifts.dinner.end}:00`,
      slots: slots.dinner,
    },
  };
}
