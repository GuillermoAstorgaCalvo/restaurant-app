import { RequestHandler } from "express";
import Reservation from "../../models/reservation";
import { validateAllBusinessRules } from "@/lib/validations/index";

export const createReservation: RequestHandler = async (req, res) => {
  try {
    const { name, email, phone, date, guests } = req.body;

    // Check for required fields
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !date || !guests) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const reservationDate = new Date(date);

    // Run all validations
    const validationResult = await validateAllBusinessRules(
      reservationDate,
      email.trim(),
      phone.trim(),
      guests,
      name.trim(),
    );

    if (!validationResult.valid) {
      return res.status(400).json({ error: validationResult.error });
    }

    // Create the reservation
    const newReservation = await Reservation.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      date: reservationDate,
      guests,
      status: "pendiente",
    });

    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear la reserva" });
  }
};
