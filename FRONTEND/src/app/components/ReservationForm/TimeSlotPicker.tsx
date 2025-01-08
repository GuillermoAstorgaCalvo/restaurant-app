import { cn } from "@/app/lib/utils";
import { Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface TimeSlotPickerProps {
  readonly value: string;
  readonly onChange: (time: string) => void;
  readonly slots: string[];
  readonly loading?: boolean;
}

export function TimeSlotPicker({
  value,
  onChange,
  slots,
  loading,
}: TimeSlotPickerProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No hay horarios disponibles para esta fecha
      </div>
    );
  }

  const timeGroups = slots.reduce(
    (acc, time) => {
      const hour = parseInt(time.split(":")[0]);
      const period = hour < 17 ? "lunch" : "dinner";
      if (!acc[period]) acc[period] = [];
      acc[period].push(time);
      return acc;
    },
    {} as Record<string, string[]>,
  );

  return (
    <div className="space-y-4">
      {Object.entries(timeGroups).map(([period, times]) => (
        <div key={period} className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 capitalize">
            {period === "lunch" ? "Comida" : "Cena"}
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {times.map((time) => (
              <Button
                key={time}
                type="button"
                variant={value === time ? "primary" : "outline"}
                size="sm"
                className={cn(
                  "justify-start",
                  value === time && "ring-2 ring-amber-200",
                )}
                onClick={() => onChange(time)}
              >
                <Clock className="w-4 h-4 mr-2" />
                {time}h
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
