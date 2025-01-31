// Extract time-related constants
export const TIME_SLOTS = [
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
] as const;

export const BUSINESS_HOURS = {
  weekdays: "13:00 - 16:00 / 20:00 - 24:00",
  saturday: "13:00 - 16:00 / 20:00 - 24:00",
  sunday: "cerrado",
} as const;

export const RESERVATION_DURATION = 90;
export const MAX_RESERVATIONS_PER_SLOT = 4;
