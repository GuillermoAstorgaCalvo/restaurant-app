import { RequestHandler } from "express";
import Reservation from "../../models/reservation";

export const updateReservation: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || isNaN(Number(id))) {
      return res
        .status(400)
        .json({ mensaje: "El ID de la reserva es inválido." });
    }

    const reservation = await Reservation.findByPk(Number(id));
    if (!reservation) {
      return res.status(404).json({ mensaje: "Reserva no encontrada." });
    }

    await reservation.update({ status });

    return res.status(200).json({
      mensaje: "Reserva actualizada exitosamente.",
      reserva: reservation,
    });
  } catch (error) {
    next(error);
  }
};
