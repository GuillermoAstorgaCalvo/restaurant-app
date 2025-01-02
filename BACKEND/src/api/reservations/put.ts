import { RequestHandler } from "express";
import Reservation from "../../models/reservation";

export const updateReservation: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      res.status(404).json({ message: "Reservation not found." });
      return; // Finaliza el controlador aquí
    }

    await reservation.update({ status });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error updating reservation.", error });
  }
};
