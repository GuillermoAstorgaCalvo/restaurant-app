"use client";

import { useState } from "react";
import { Calendar } from "@/app/components/ui/calendar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { cn } from "@/app/lib/utils/cn";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Users } from "lucide-react";
import { useReservations } from "@/app/hooks/useReservations";
import { TimePicker } from "./TimePicker";
import { combineDateAndTime } from "@/app/lib/utils/date";
import { toast } from "sonner";

// Import validations from external files
import {
  validateName,
  validateEmail,
  validatePhone,
} from "@/app/lib/validations/contact-info";
import { validateGuests } from "@/app/lib/validations/guests";
import { validateDate } from "@/app/lib/validations/date";

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: Date | undefined;
  time: string;
  guests: number;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  date: undefined,
  time: "",
  guests: 1,
};

export function ReservationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { loading, createReservation, reservations } = useReservations();

  const validateForm = (): boolean => {
    const { name, email, phone, date, time, guests } = formData;

    if (!validateName(name).valid) {
      toast.error(validateName(name).error);
      return false;
    }

    if (!validateEmail(email).valid) {
      toast.error(validateEmail(email).error);
      return false;
    }

    if (!validatePhone(phone).valid) {
      toast.error(validatePhone(phone).error);
      return false;
    }

    if (!validateGuests(guests).valid) {
      toast.error(validateGuests(guests).error);
      return false;
    }

    if (!date) {
      toast.error("Por favor, selecciona una fecha válida");
      return false;
    }

    if (!time) {
      toast.error("Por favor, selecciona una hora válida");
      return false;
    }

    const dateTime = combineDateAndTime(date, time);

    if (!validateDate(new Date(dateTime)).valid) {
      toast.error(validateDate(new Date(dateTime)).error);
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value, 10) || 1 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    const dateTime = combineDateAndTime(formData.date!, formData.time);

    const success = await createReservation({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: dateTime,
      guests: formData.guests,
    });

    if (success) {
      setFormData(initialFormData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label>Fecha</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.date ? (
                  format(formData.date, "PPP", { locale: es })
                ) : (
                  <span>Selecciona una fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) =>
                  setFormData((prev) => ({
                    ...prev,
                    date, // No need to transform `null` here
                  }))
                }
                disabled={(date) => date < new Date()}
                locale={es}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-2">
          <Label>Hora</Label>
          <TimePicker
            value={formData.time}
            onChange={(time) => setFormData((prev) => ({ ...prev, time }))}
            date={formData.date || new Date()}
            reservations={reservations || []}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="guests">Número de personas</Label>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <Input
              id="guests"
              name="guests"
              type="number"
              min="1"
              max="10"
              value={formData.guests}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Enviando..." : "Confirmar reserva"}
      </Button>
    </form>
  );
}
