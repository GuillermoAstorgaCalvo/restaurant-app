const SEASONS = {
  high: [
    { start: "2024-07-01", end: "2024-08-31" },
    { start: "2024-12-15", end: "2024-12-31" },
  ],
  low: [
    { start: "2024-01-15", end: "2024-02-28" },
    { start: "2024-09-15", end: "2024-10-31" },
  ],
};

const MAX_GROUP_SIZE_HIGH_SEASON = 8;
const MIN_ADVANCE_DAYS_HIGH_SEASON = 5;

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
