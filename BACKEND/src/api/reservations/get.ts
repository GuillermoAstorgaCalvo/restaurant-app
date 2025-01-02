import { RequestHandler } from "express";
import Reservation from "../../models/reservation";

export const getReservations: RequestHandler = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations.", error });
  }
};
