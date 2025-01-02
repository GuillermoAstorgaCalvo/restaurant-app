import { RequestHandler } from "express";
import Reservation from "../../models/reservation";

export const deleteReservation: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      res.status(404).json({ message: "Reservation not found." });
      return; // Finaliza el controlador aquí
    }

    await reservation.destroy();
    res.status(200).json({ message: "Reservation deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reservation.", error });
  }
};
