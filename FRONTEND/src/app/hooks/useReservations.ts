import { useState, useEffect } from "react";
import { reservationsApi } from "@/app/api/reservations";
import { CreateReservationData, Reservation } from "@/app/types/reservation";
import { toast } from "sonner";
import { createReservationSchema } from "@/app/lib/validations/reservation";
import { ZodError } from "zod";

export function useReservations() {
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Fetch reservations when the component mounts
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const response = await reservationsApi.getAll(); // Fetch reservations from API
        setReservations(response); // Set fetched reservations
      } catch (error) {
        console.error("Error fetching reservations:", error);
        toast.error("Error al cargar las reservas");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const createReservation = async (
    data: CreateReservationData,
  ): Promise<boolean> => {
    try {
      console.log("Reservation Data Sent:", data); // Debugging log

      const validatedData = createReservationSchema.parse(data);

      await reservationsApi.create(validatedData);

      const updatedReservations = await reservationsApi.getAll();
      setReservations(updatedReservations);

      toast.success("¡Reserva creada con éxito!");
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.errors.map((e) => e.message);
        toast.error(messages.join("\n"));
      } else {
        toast.error("Error al crear la reserva");
      }
      return false;
    }
  };

  return {
    loading,
    reservations,
    createReservation,
  };
}
