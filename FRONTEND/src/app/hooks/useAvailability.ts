import { useState } from "react";
import { api } from "../api/config";
import {
  AvailabilityResponse,
  TimeSlotResponse,
} from "@/app/types/reservation";
import { useAvailabilityCache } from "./useAvailabilityCache";
import { useReservationErrors } from "./useReservationErrors";

export function useAvailability() {
  const [loading, setLoading] = useState(false);
  const { getCached, setCached } = useAvailabilityCache();
  const { error, handleError, clearError } = useReservationErrors();

  const checkTimeSlot = async (
    date: string,
    guests: number,
  ): Promise<TimeSlotResponse> => {
    clearError();
    setLoading(true);
    try {
      const { data } = await api.get<TimeSlotResponse>(
        "/reservations/time-slots",
        {
          params: { date, guests },
        },
      );
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        handleError(err);
        throw err;
      } else {
        const unexpectedError = new Error("An unexpected error occurred");
        handleError(unexpectedError);
        throw unexpectedError;
      }
    } finally {
      setLoading(false);
    }
  };

  const getAvailability = async (
    date: string,
  ): Promise<AvailabilityResponse> => {
    clearError();

    // Attempt to fetch from cache first
    const cached = getCached(date);
    if (cached) return cached;

    setLoading(true);
    try {
      const { data } = await api.get<AvailabilityResponse>(
        "/reservations/availability",
        {
          params: { date },
        },
      );

      // Cache the result
      setCached(date, data);
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        handleError(err);
        throw err;
      } else {
        const unexpectedError = new Error("An unexpected error occurred");
        handleError(unexpectedError);
        throw unexpectedError;
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    checkTimeSlot,
    getAvailability,
  };
}
