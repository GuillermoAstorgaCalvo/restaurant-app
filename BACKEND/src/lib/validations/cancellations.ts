import { Op } from "sequelize";
import { Reservation } from "../../models/reservation";

const MAX_CANCELLATIONS_PER_MONTH = 3;
const MIN_HOURS_FOR_CANCELLATION = 24;

export async function validateCancellationLimits(email: string) {
  const cancelationsThisMonth = await Reservation.count({
    where: {
      email,
      status: "cancelada",
      updatedAt: {
        [Op.gte]: new Date(new Date().setDate(1)),
      },
    },
  });

  if (cancelationsThisMonth >= MAX_CANCELLATIONS_PER_MONTH) {
    return {
      valid: false,
      error:
        "Ha excedido el número máximo de cancelaciones permitidas este mes",
    };
  }

  return { valid: true };
}

export async function validateCancellationTime(reservationDate: Date) {
  const hoursUntilReservation =
    (reservationDate.getTime() - new Date().getTime()) / (1000 * 60 * 60);

  if (hoursUntilReservation < MIN_HOURS_FOR_CANCELLATION) {
    return {
      valid: false,
      error:
        "Las cancelaciones deben realizarse con al menos 24 horas de anticipación",
    };
  }

  return { valid: true };
}
