import { Reservation } from "@/app/types/reservation";
import { RESTAURANT_CONFIG } from "../constants/restaurant";

export function getMinDateTime(): Date {
  const now = new Date();
  return new Date(
    now.getTime() +
      RESTAURANT_CONFIG.reservations.minHoursInAdvance * 60 * 60 * 1000,
  );
}

export function getReservationsInHour(
  reservations: Reservation[],
  date: Date,
): number {
  const hourStart = new Date(date);
  hourStart.setMinutes(0, 0, 0);
  const hourEnd = new Date(hourStart);
  hourEnd.setHours(hourStart.getHours() + 1);

  return reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.date);
    return reservationDate >= hourStart && reservationDate < hourEnd;
  }).length;
}

export function isTimeSlotAvailable(
  date: Date,
  reservations: Reservation[],
): boolean {
  const hourReservations = getReservationsInHour(reservations, date);
  return hourReservations < RESTAURANT_CONFIG.reservations.maxPerHour;
}

export function isValidReservationTime(date: Date): boolean {
  return date >= getMinDateTime();
}

export function combineDateAndTime(date: Date, time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const combinedDate = new Date(date);
  combinedDate.setHours(hours, minutes, 0, 0);
  return combinedDate.toISOString();
}
