import { Op } from "sequelize";
import { Reservation } from "../../models/reservation";

export async function validateConsecutiveDays(email: string, date: Date) {
  const consecutiveReservations = await Reservation.findAll({
    where: {
      email,
      status: {
        [Op.in]: ["pendiente", "confirmada"],
      },
      date: {
        [Op.between]: [
          new Date(date.getTime() - 24 * 60 * 60 * 1000),
          new Date(date.getTime() + 24 * 60 * 60 * 1000),
        ],
      },
    },
  });

  if (consecutiveReservations.length > 0) {
    return {
      valid: false,
      error: "No se permiten reservas en días consecutivos",
    };
  }

  return { valid: true };
}
