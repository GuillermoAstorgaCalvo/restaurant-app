import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { generateTimeSlots } from "@/app/lib/utils/time-slots";
import { Reservation } from "@/app/types/reservation";

interface TimePickerProps {
  readonly value?: string;
  readonly onChange: (time: string) => void;
  readonly date: Date; // Add `date` prop
  readonly reservations: Reservation[]; // Add `reservations` prop
}

export function TimePicker({
  value,
  onChange,
  date,
  reservations,
}: TimePickerProps) {
  const timeSlots = generateTimeSlots(date, reservations); // Pass arguments here

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
