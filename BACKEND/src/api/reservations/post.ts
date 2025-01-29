import { RequestHandler } from "express";
import Reservation from "../../models/reservation";
import { validateAllBusinessRules } from "@/lib/validations";
import { sendEmail } from "@/lib/utils/emailService";
import { confirmationEmailTemplate } from "@/lib/utils/emailTemplates/confirmationEmailTemplate";

export const createReservation: RequestHandler = async (req, res) => {
  try {
    const { name, email, phone, date, guests } = req.body;

    if (!name?.trim() || !email?.trim() || !phone?.trim() || !date || !guests) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const reservationDate = new Date(date);

    const validationResult = await validateAllBusinessRules(
      reservationDate,
      email.trim(),
      phone.trim(),
      guests,
      name.trim()
    );

    if (!validationResult.valid) {
      return res.status(400).json({ error: validationResult.error });
    }

    const newReservation = await Reservation.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      date: reservationDate,
      guests,
      status: "pendiente",
    });

    await sendEmail({
      to: email.trim(),
      subject: "Confirmación de Reserva",
      html: confirmationEmailTemplate(
        name.trim(),
        email.trim(),
        phone.trim(),
        reservationDate.toLocaleString(),
        guests
      ),
    });

    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear la reserva" });
  }
};
