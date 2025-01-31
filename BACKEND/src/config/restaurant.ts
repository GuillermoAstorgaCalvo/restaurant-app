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

export const MAX_CANCELLATIONS_PER_MONTH = 3;
export const MIN_HOURS_FOR_CANCELLATION = 12;

export const MIN_HOURS_ADVANCE_LARGE_GROUPS = 12;
export const MAX_LARGE_GROUPS_PER_DAY = 2;

export const PEAK_HOURS = {
  lunch: { start: 14, end: 15 },
  dinner: { start: 21, end: 22 },
};

export const MAX_SIMULTANEOUS_ARRIVALS = 3;

export const MAX_ACTIVE_RESERVATIONS = 2;

export const MAX_ADVANCE_DAYS = 30;

export const SEASONS = {
  high: [
    { start: "2024-07-01", end: "2024-08-31" },
    { start: "2024-12-15", end: "2024-12-31" },
  ],
  low: [
    { start: "2024-01-15", end: "2024-02-28" },
    { start: "2024-09-15", end: "2024-10-31" },
  ],
};

export const MAX_GROUP_SIZE_HIGH_SEASON = 8;
export const MIN_ADVANCE_DAYS_HIGH_SEASON = 5;

export const SPECIAL_DATES = new Set([
  "2024-12-24",
  "2024-12-25",
  "2024-12-31",
  "2025-01-01",
]);

export const CLOSED_DATES = new Set(["2024-01-01", "2024-12-25"]);
