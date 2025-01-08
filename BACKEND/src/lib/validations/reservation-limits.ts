import { Op } from "sequelize";
import { Reservation } from "../../models/reservation";

const MAX_ACTIVE_RESERVATIONS = 2;

export async function validateReservationLimits(email: string, phone: string) {
  const activeReservationsByEmail = await Reservation.count({
    where: {
      email,
      status: {
        [Op.in]: ["pendiente", "confirmada"],
      },
      date: {
        [Op.gte]: new Date(),
      },
    },
  });

  if (activeReservationsByEmail >= MAX_ACTIVE_RESERVATIONS) {
    return {
      valid: false,
      error: `Lo sentimos, solo puede tener ${MAX_ACTIVE_RESERVATIONS} reservas activas simultáneamente`,
    };
  }

  const activeReservationsByPhone = await Reservation.count({
    where: {
      phone,
      status: {
        [Op.in]: ["pendiente", "confirmada"],
      },
      date: {
        [Op.gte]: new Date(),
      },
    },
  });

  if (activeReservationsByPhone >= MAX_ACTIVE_RESERVATIONS) {
    return {
      valid: false,
      error: `Lo sentimos, este número de teléfono ya tiene el máximo de reservas permitidas`,
    };
  }

  return { valid: true };
}
