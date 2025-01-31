import { useState, useCallback } from "react";
import { Reservation } from "@/app/types/reservation";

interface CacheEntry {
  data: Reservation;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000;

export function useReservationCache() {
  const [cache, setCache] = useState<Record<string, CacheEntry>>({});

  const getCached = useCallback(
    (id: number): Reservation | null => {
      const entry = cache[id];
      if (!entry) return null;

      const isExpired = Date.now() - entry.timestamp > CACHE_DURATION;
      if (isExpired) {
        const newCache = { ...cache };
        delete newCache[id];
        setCache(newCache);
        return null;
      }

      return entry.data;
    },
    [cache],
  );

  const setCached = useCallback((id: number, data: Reservation) => {
    setCache((prev) => ({
      ...prev,
      [id]: {
        data,
        timestamp: Date.now(),
      },
    }));
  }, []);

  const invalidateCache = useCallback((id: number) => {
    setCache((prev) => {
      const newCache = { ...prev };
      delete newCache[id];
      return newCache;
    });
  }, []);

  const clearCache = useCallback(() => {
    setCache({});
  }, []);

  return {
    getCached,
    setCached,
    invalidateCache,
    clearCache,
  };
}
