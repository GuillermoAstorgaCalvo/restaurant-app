import { useMemo } from "react";
import { CalendarClock } from "lucide-react";

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

interface Props {
  readonly date: string;
}

export function SeasonIndicator({ date }: Props) {
  const season = useMemo(() => {
    const isHighSeason = SEASONS.high.some(
      (period) => date >= period.start && date <= period.end,
    );

    if (isHighSeason) {
      return {
        type: "high",
        label: "Temporada Alta",
        description: "Se requiere reserva con mayor anticipación",
        className: "bg-amber-50 text-amber-800 border-amber-200",
      };
    }

    const isLowSeason = SEASONS.low.some(
      (period) => date >= period.start && date <= period.end,
    );

    if (isLowSeason) {
      return {
        type: "low",
        label: "Temporada Baja",
        description: "Mayor disponibilidad y flexibilidad",
        className: "bg-green-50 text-green-800 border-green-200",
      };
    }

    return {
      type: "regular",
      label: "Temporada Regular",
      description: "Condiciones normales de reserva",
      className: "bg-blue-50 text-blue-800 border-blue-200",
    };
  }, [date]);

  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-lg border ${season.className}`}
    >
      <CalendarClock className="w-4 h-4" />
      <div>
        <p className="text-sm font-medium">{season.label}</p>
        <p className="text-xs">{season.description}</p>
      </div>
    </div>
  );
}
