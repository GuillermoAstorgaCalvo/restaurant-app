import { RequestHandler } from "express";
import { getCached, setCached } from "../lib/cache";

interface CacheOptions {
  key: (req: any) => string;
  ttl?: number;
}

export const cache = (options: CacheOptions): RequestHandler => {
  return async (req, res, next) => {
    const cacheKey = options.key(req);
    const cached = getCached(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    // Interceptar el método json para cachear la respuesta
    const originalJson = res.json;
    res.json = function (body) {
      setCached(cacheKey, body);
      return originalJson.call(this, body);
    };

    next();
  };
};
