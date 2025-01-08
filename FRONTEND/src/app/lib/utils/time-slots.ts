import { Reservation } from "@/app/types/reservation";
import { RESTAURANT_CONFIG } from "../constants/restaurant";
import { getMinDateTime, isTimeSlotAvailable } from "./date";

function isWithinBusinessHours(hour: number): boolean {
  const { shifts } = RESTAURANT_CONFIG;
  return (
    (hour >= shifts.lunch.start && hour < shifts.lunch.end) ||
    (hour >= shifts.dinner.start && hour < shifts.dinner.end)
  );
}

export function generateTimeSlots(
  date: Date,
  reservations: Reservation[],
): string[] {
  const timeSlots: string[] = [];
  const minDateTime = getMinDateTime();

  for (let hour = 0; hour < 24; hour++) {
    if (!isWithinBusinessHours(hour)) continue;

    for (
      let minutes = 0;
      minutes < 60;
      minutes += RESTAURANT_CONFIG.reservations.interval
    ) {
      const slotTime = new Date(date);
      slotTime.setHours(hour, minutes, 0, 0);

      if (slotTime < minDateTime) continue;

      if (isTimeSlotAvailable(slotTime, reservations)) {
        timeSlots.push(
          `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`,
        );
      }
    }
  }

  return timeSlots;
}
