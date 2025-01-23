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

export const TABLE_CONFIG = {
  small: { capacity: 2, count: 6 },
  medium: { capacity: 4, count: 4 },
  large: { capacity: 6, count: 2 },
};
