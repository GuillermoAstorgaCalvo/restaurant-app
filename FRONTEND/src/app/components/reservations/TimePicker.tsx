import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { generateTimeSlots } from "@/app/lib/utils/date";

interface TimePickerProps {
  readonly value?: string;
  readonly onChange: (time: string) => void;
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const timeSlots = generateTimeSlots();

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Selecciona una hora" />
      </SelectTrigger>
      <SelectContent>
        {timeSlots.map((time) => (
          <SelectItem key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
