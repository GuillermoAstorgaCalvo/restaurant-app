import { useCallback, useEffect, useState } from "react";
import { FormData } from "./types";
import { Button } from "../ui/button";
import { FormField, FormLabel } from "../ui/form";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { GuestsPicker } from "./GuestsPicker";
import { Input } from "../ui/input";
import { CalendarDays } from "lucide-react";
import { useAvailability } from "@/app/hooks/useAvailability";
import { SeasonIndicator } from "./SeasonIndicator";
import { ErrorDisplay } from "./ErrorDisplay";

interface Props {
  readonly formData: FormData;
  readonly setFormData: (data: FormData) => void;
  readonly onBack: () => void;
  readonly onNext: () => void;
}

export function ReservationDetails({
  formData,
  setFormData,
  onBack,
  onNext,
}: Props) {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const { loading, error, getAvailability } = useAvailability();

  const loadAvailability = useCallback(async () => {
    try {
      const availability = await getAvailability(formData.date);
      const allSlots = [
        ...availability.daily.lunch.slots,
        ...availability.daily.dinner.slots,
      ];
      setTimeSlots(allSlots);
    } catch {
      setTimeSlots([]);
    }
  }, [formData.date, getAvailability]);

  useEffect(() => {
    if (formData.date) {
      loadAvailability();
    }
  }, [formData.date, loadAvailability]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorDisplay type={error.type} message={error.message} />}

      <FormField>
        <FormLabel htmlFor="date" required>
          Fecha
        </FormLabel>
        <div className="space-y-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarDays className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              id="date"
              type="date"
              className="pl-10"
              value={formData.date}
              onChange={(e) => {
                setFormData({ ...formData, date: e.target.value, time: "" });
              }}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
          {formData.date && <SeasonIndicator date={formData.date} />}
        </div>
      </FormField>

      {formData.date && (
        <FormField>
          <FormLabel required>Hora</FormLabel>
          <TimeSlotPicker
            value={formData.time}
            onChange={(time) => setFormData({ ...formData, time })}
            slots={timeSlots}
            loading={loading}
          />
        </FormField>
      )}

      <FormField>
        <FormLabel required>Número de personas</FormLabel>
        <GuestsPicker
          value={formData.guests}
          onChange={(guests) => setFormData({ ...formData, guests })}
        />
      </FormField>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onBack}
          className="flex-1"
        >
          Atrás
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={!formData.date || !formData.time}
        >
          Siguiente
        </Button>
      </div>
    </form>
  );
}
