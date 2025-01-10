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

// Configuración de mesas
export const TABLE_CONFIG = {
  small: { capacity: 2, count: 6 }, // 4 mesas de 2 personas
  medium: { capacity: 4, count: 4 }, // 6 mesas de 4 personas
  large: { capacity: 6, count: 2 }, // 2 mesas de 6 personas
};
