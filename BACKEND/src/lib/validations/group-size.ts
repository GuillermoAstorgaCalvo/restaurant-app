import { Op } from "sequelize";
import { Reservation } from "../../models/reservation";

const MIN_HOURS_ADVANCE_LARGE_GROUPS = 48;
const MAX_LARGE_GROUPS_PER_DAY = 2;

export async function validateGroupSize(date: Date, guests: number) {
  if (guests >= 6) {
    // Validar anticipación para grupos grandes
    const hoursInAdvance =
      (date.getTime() - new Date().getTime()) / (1000 * 60 * 60);
    if (hoursInAdvance < MIN_HOURS_ADVANCE_LARGE_GROUPS) {
      return {
        valid: false,
        error: `Las reservas para grupos de 6 o más personas deben realizarse con al menos ${MIN_HOURS_ADVANCE_LARGE_GROUPS} horas de anticipación`,
      };
    }

    // Validar límite de grupos grandes por día
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    if (isWeekend) {
      const existingLargeGroups = await Reservation.count({
        where: {
          date: {
            [Op.between]: [
              new Date(date.setHours(0, 0, 0, 0)),
              new Date(date.setHours(23, 59, 59, 999)),
            ],
          },
          guests: {
            [Op.gt]: 6,
          },
          status: {
            [Op.in]: ["pendiente", "confirmada"],
          },
        },
      });

      if (existingLargeGroups >= MAX_LARGE_GROUPS_PER_DAY) {
        return {
          valid: false,
          error:
            "Lo sentimos, ya tenemos el máximo de grupos grandes permitidos para este día",
        };
      }
    }
  }

  return { valid: true };
}
