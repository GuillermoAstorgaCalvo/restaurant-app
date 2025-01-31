import { Minus, Plus, Users } from "lucide-react";
import { Button } from "../ui/button";

interface GuestsPickerProps {
  readonly value: number;
  readonly onChange: (guests: number) => void;
  readonly min?: number;
  readonly max?: number;
}

export function GuestsPicker({
  value,
  onChange,
  min = 1,
  max = 10,
}: GuestsPickerProps) {
  return (
    <div className="flex items-center gap-4 p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <Users className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-medium">
          {value} {value === 1 ? "persona" : "personas"}
        </span>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
