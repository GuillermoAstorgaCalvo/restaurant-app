export const RESTAURANT_CONFIG = {
  maxReservationsPerHour: 8,
  minHoursInAdvance: 2,
  interval: 30,
  shifts: {
    lunch: {
      start: 13,
      end: 16,
    },
    dinner: {
      start: 19,
      end: 23,
    },
  },
} as const;
