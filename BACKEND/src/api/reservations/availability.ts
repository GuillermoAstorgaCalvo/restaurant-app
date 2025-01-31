import { RequestHandler } from "express";
import {
  getHourlyAvailability,
  getDailyAvailability,
} from "@/lib/reservations/availability";
import { cache } from "../../middleware/cache";
import { cacheKeys } from "../../lib/cache";

export const getAvailability: RequestHandler[] = [
  cache({
    key: (req) => cacheKeys.availability(req.query.date as string),
  }),
  async (req, res) => {
    try {
      const { date } = req.query;

      if (!date) {
        return res.status(400).json({ error: "Se requiere una fecha." });
      }

      const requestDate = new Date(date as string);
      if (isNaN(requestDate.getTime())) {
        return res.status(400).json({ error: "Fecha inválida." });
      }

      const hourlyAvailability = await getHourlyAvailability(requestDate);
      const dailyAvailability = await getDailyAvailability(requestDate);

      res.json({
        hourly: hourlyAvailability,
        daily: dailyAvailability,
        date: requestDate.toISOString(),
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al verificar la disponibilidad." });
    }
  },
];
