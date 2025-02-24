import {
  SEASONS,
  MAX_GROUP_SIZE_HIGH_SEASON,
  MIN_ADVANCE_DAYS_HIGH_SEASON,
} from "@/config/restaurant";

export function validateSeasonalRules(date: Date, guests: number) {
  const dateString = date.toISOString().split("T")[0];

  const isHighSeason = SEASONS.high.some(
    (period) => dateString >= period.start && dateString <= period.end,
  );

  if (isHighSeason) {
    if (guests > MAX_GROUP_SIZE_HIGH_SEASON) {
      return {
        valid: false,
        error: `Durante temporada alta, el máximo de comensales por reserva es ${MAX_GROUP_SIZE_HIGH_SEASON}`,
      };
    }

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

  const isLowSeason = SEASONS.low.some(
    (period) => dateString >= period.start && dateString <= period.end,
  );

  if (isLowSeason) {
    return { valid: true, isLowSeason: true };
  }

  return { valid: true };
}
