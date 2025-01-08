import { Op } from "sequelize";
import { Reservation } from "../../models/reservation";

// Temporadas alta y baja
const SEASONS = {
  high: [
    { start: "2024-07-01", end: "2024-08-31" }, // Verano
    { start: "2024-12-15", end: "2024-12-31" }, // Navidad
  ],
  low: [
    { start: "2024-01-15", end: "2024-02-28" }, // Después de navidad
    { start: "2024-09-15", end: "2024-10-31" }, // Otoño
  ],
};

const MAX_GROUP_SIZE_HIGH_SEASON = 8;
const MIN_ADVANCE_DAYS_HIGH_SEASON = 5;

export function validateSeasonalRules(date: Date, guests: number) {
  const dateString = date.toISOString().split("T")[0];

  // Verificar si es temporada alta
  const isHighSeason = SEASONS.high.some(
    (period) => dateString >= period.start && dateString <= period.end,
  );

  if (isHighSeason) {
    // Restricciones de tamaño de grupo en temporada alta
    if (guests > MAX_GROUP_SIZE_HIGH_SEASON) {
      return {
        valid: false,
        error: `Durante temporada alta, el máximo de comensales por reserva es ${MAX_GROUP_SIZE_HIGH_SEASON}`,
      };
    }

    // Verificar anticipación mínima en temporada alta
    const daysInAdvance = Math.ceil(
      (date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
    );
    if (daysInAdvance < MIN_ADVANCE_DAYS_HIGH_SEASON) {
      return {
        valid: false,
        error: `Durante temporada alta, las reservas deben hacerse con al menos ${MIN_ADVANCE_DAYS_HIGH_SEASON} días de anticipación`,
      };
    }
  }

  // Verificar si es temporada baja para posibles promociones
  const isLowSeason = SEASONS.low.some(
    (period) => dateString >= period.start && dateString <= period.end,
  );

  if (isLowSeason) {
    // En temporada baja podríamos ser más flexibles, pero aún así validamos
    // Por ahora solo retornamos válido, pero podríamos añadir lógica adicional
    return { valid: true, isLowSeason: true };
  }

  return { valid: true };
}
