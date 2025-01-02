import { useState } from "react";
import { createReservation } from "@/app/api/reservations";
import type { CreateReservationData } from "@/app/types/index";
import { toast } from "sonner";

export function useReservation() {
  const [loading, setLoading] = useState(false);

  const handleCreateReservation = async (data: CreateReservationData) => {
    setLoading(true);
    try {
      await createReservation(data);
      toast.success("¡Reserva enviada con éxito!");
      return true;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error al procesar la reserva";
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createReservation: handleCreateReservation,
  };
}
