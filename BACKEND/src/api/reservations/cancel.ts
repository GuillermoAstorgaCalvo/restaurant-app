import { RequestHandler } from "express";
import Reservation from "../../models/reservation";
import { sendEmail } from "@/lib/utils/emailService";
import { cancellationEmailTemplate } from "@/lib/utils/emailTemplates/cancellationEmailTemplate";

export const cancelReservation: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "Invalid reservation ID." });
    }

    const reservation = await Reservation.findByPk(Number(id));
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    const { email, name, date } = reservation.get();

    if (!email) {
      return res.status(500).json({ error: "Reservation email is missing." });
    }

    await sendEmail({
      to: email,
      subject: "Cancelación de Reserva",
      html: cancellationEmailTemplate(name, new Date(date).toLocaleString()),
    });

    await reservation.update({ status: "cancelada" });

    res.status(200).json({ message: "Reservation canceled successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error canceling reservation.", error });
  }
};
