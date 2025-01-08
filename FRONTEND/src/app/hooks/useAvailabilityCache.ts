import { useState, useCallback } from "react";
import { AvailabilityResponse } from "@/app/types/reservation";

interface CacheEntry {
  data: AvailabilityResponse;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export function useAvailabilityCache() {
  const [cache, setCache] = useState<Record<string, CacheEntry>>({});

  const getCached = useCallback(
    (date: string): AvailabilityResponse | null => {
      const entry = cache[date];
      if (!entry) return null;

      const isExpired = Date.now() - entry.timestamp > CACHE_DURATION;
      if (isExpired) {
        const newCache = { ...cache };
        delete newCache[date];
        setCache(newCache);
        return null;
      }

      return entry.data;
    },
    [cache],
  );

  const setCached = useCallback((date: string, data: AvailabilityResponse) => {
    setCache((prev) => ({
      ...prev,
      [date]: {
        data,
        timestamp: Date.now(),
      },
    }));
  }, []);

  const clearCache = useCallback(() => {
    setCache({});
  }, []);

  return {
    getCached,
    setCached,
    clearCache,
  };
}
