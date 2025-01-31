import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 });

export const cacheKeys = {
  availability: (date: string) => `availability:${date}`,
  timeSlots: (date: string) => `timeSlots:${date}`,
  reservationCount: (date: string) => `reservationCount:${date}`,
};

export function getCached<T>(key: string): T | undefined {
  return cache.get<T>(key);
}

export function setCached<T>(key: string, value: T): void {
  cache.set(key, value);
}

export function invalidateCache(pattern: string): void {
  const keys = cache.keys().filter((key) => key.startsWith(pattern));
  keys.forEach((key) => cache.del(key));
}

export function clearCache(): void {
  cache.flushAll();
}
