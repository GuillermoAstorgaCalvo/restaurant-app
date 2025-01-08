import { Op } from "sequelize";
import { Reservation } from "../../models/reservation";

// Configuración de horas pico
const PEAK_HOURS = {
  lunch: { start: 14, end: 15 }, // 14:00 - 15:00
  dinner: { start: 21, end: 22 }, // 21:00 - 22:00
};

const MAX_SIMULTANEOUS_ARRIVALS = 3; // Máximo de llegadas simultáneas en el mismo intervalo

export async function validatePeakHours(date: Date) {
  const hour = date.getHours();
  const isPeakLunch =
    hour >= PEAK_HOURS.lunch.start && hour < PEAK_HOURS.lunch.end;
  const isPeakDinner =
    hour >= PEAK_HOURS.dinner.start && hour < PEAK_HOURS.dinner.end;

  if (isPeakLunch || isPeakDinner) {
    // Verificar reservas en el mismo intervalo de 15 minutos
    const intervalStart = new Date(date);
    intervalStart.setMinutes(Math.floor(date.getMinutes() / 15) * 15, 0, 0);

    const intervalEnd = new Date(intervalStart);
    intervalEnd.setMinutes(intervalStart.getMinutes() + 15);

    const simultaneousArrivals = await Reservation.count({
      where: {
        date: {
          [Op.gte]: intervalStart,
          [Op.lt]: intervalEnd,
        },
        status: {
          [Op.in]: ["pendiente", "confirmada"],
        },
      },
    });

    if (simultaneousArrivals >= MAX_SIMULTANEOUS_ARRIVALS) {
      return {
        valid: false,
        error:
          "Este horario está muy solicitado. Por favor, elige un horario 15 minutos antes o después",
      };
    }
  }

  return { valid: true };
}
