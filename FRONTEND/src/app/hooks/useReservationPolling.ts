import { useState, useEffect, useCallback } from "react";
import { reservationsApi } from "../api/reservations/reservations";
import { Reservation } from "@/app/types/reservation";
import { useReservationCache } from "./useReservationCache";

const POLLING_INTERVAL = 30000;

export function useReservationPolling(reservationId?: number) {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { getCached, setCached } = useReservationCache();

  const fetchReservation = useCallback(async () => {
    if (!reservationId) return;

    try {
      setLoading(true);
      setError(null);

      const cached = getCached(reservationId);
      if (cached) {
        setReservation(cached);
        return;
      }

      const data = await reservationsApi.getById(reservationId);
      setReservation(data);
      setCached(reservationId, data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [reservationId, getCached, setCached]);

  useEffect(() => {
    fetchReservation();

    if (!reservationId) return;

    const interval = setInterval(fetchReservation, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [reservationId, fetchReservation]);

  return {
    reservation,
    loading,
    error,
    refetch: fetchReservation,
  };
}
