import { RequestHandler } from "express";
import Reservation from "../../models/reservation";

export const deleteReservation: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body; // Get the ID from the request body

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "Invalid reservation ID." });
    }

    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    await reservation.destroy();
    res.status(200).json({ message: "Reservation deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reservation.", error });
  }
};
