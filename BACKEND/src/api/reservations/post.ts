import { RequestHandler } from "express";
import Reservation from "../../models/reservation";

export const createReservation: RequestHandler = async (req, res) => {
  try {
    const { name, email, phone, date, guests } = req.body;

    if (!name || !email || !phone || !date || !guests) {
      res.status(400).json({ error: "Todos los campos son obligatorios." });
      return;
    }

    const newReservation = await Reservation.create({
      name,
      email,
      phone,
      date: new Date(date),
      guests,
      status: "pendiente",
    });

    res.status(201).json(newReservation);
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    res.status(500).json({ error: "No se pudo crear la reserva." });
  }
};
