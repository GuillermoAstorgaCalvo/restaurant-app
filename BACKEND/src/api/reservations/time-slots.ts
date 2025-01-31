import { RequestHandler } from "express";
import {
  findNextAvailableSlot,
  isTimeSlotAvailable,
} from "@/lib/reservations/time-slots";
import { cache } from "../../middleware/cache";
import { cacheKeys } from "../../lib/cache";

export const getTimeSlots: RequestHandler[] = [
  cache({
    key: (req) => cacheKeys.timeSlots(req.query.date as string),
  }),
  async (req, res) => {
    try {
      const { date, guests } = req.query;

      if (!date) {
        return res.status(400).json({ error: "Se requiere una fecha" });
      }

      const requestDate = new Date(date as string);
      if (isNaN(requestDate.getTime())) {
        return res.status(400).json({ error: "Fecha inválida" });
      }

      const isAvailable = await isTimeSlotAvailable(requestDate);

      if (!isAvailable && guests) {
        const nextSlot = await findNextAvailableSlot(
          requestDate,
          Number(guests),
        );

        if (nextSlot) {
          return res.json({
            available: false,
            nextAvailableSlot: nextSlot.toISOString(),
            message:
              "Horario no disponible. Se sugiere el siguiente horario disponible.",
          });
        }
      }

      res.json({
        available: isAvailable,
        requestedTime: requestDate.toISOString(),
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al verificar disponibilidad del horario" });
    }
  },
];
