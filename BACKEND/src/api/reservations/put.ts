import { RequestHandler } from "express";
import Reservation from "../../models/reservation";
import { validateAllBusinessRules } from "@/lib/validations";
import { sendEmail } from "@/lib/utils/emailService";
import { updateEmailTemplate } from "@/lib/utils/emailTemplates/updateEmailTemplate";
import { reservationStatusEmailTemplate } from "@/lib/utils/emailTemplates/reservationStatusEmailTemplate";

export const updateReservation: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, date, guests, status } = req.body;

    if (!id || isNaN(Number(id))) {
      return res
        .status(400)
        .json({ mensaje: "El ID de la reserva es inválido." });
    }

    const reservation = await Reservation.findByPk(Number(id));
    if (!reservation) {
      return res.status(404).json({ mensaje: "Reserva no encontrada." });
    }

    let reservationDate = reservation.date;
    if (date) {
      reservationDate = new Date(date);
      if (isNaN(reservationDate.getTime())) {
        return res
          .status(400)
          .json({ mensaje: "La fecha proporcionada no es válida." });
      }
    }

    const validationResult = await validateAllBusinessRules(
      reservationDate,
      email?.trim() || reservation.email,
      phone?.trim() || reservation.phone,
      guests || reservation.guests,
      name?.trim() || reservation.name,
    );

    if (!validationResult.valid) {
      return res.status(400).json({ error: validationResult.error });
    }

    const changes: string[] = [];
    if (name && name !== reservation.name) changes.push(`Nombre: ${name}`);
    if (email && email !== reservation.email) changes.push(`Email: ${email}`);
    if (phone && phone !== reservation.phone)
      changes.push(`Teléfono: ${phone}`);
    if (
      date &&
      reservation.date &&
      reservationDate.toISOString() !== reservation.date.toISOString()
    ) {
      changes.push(`Fecha: ${reservationDate.toLocaleString()}`);
    }
    if (guests && guests !== reservation.guests)
      changes.push(`Número de invitados: ${guests}`);
    if (status && status !== reservation.status)
      changes.push(`Estado: ${status}`);

    const updatedReservation = await reservation.update({
      name: name?.trim() || reservation.name,
      email: email?.trim().toLowerCase() || reservation.email,
      phone: phone?.trim() || reservation.phone,
      date: reservationDate || reservation.date,
      guests: guests || reservation.guests,
      status: status || reservation.status,
    });

    const emailToSend =
      updatedReservation.get("email")?.trim() || email?.trim();

    if (!emailToSend || !emailToSend.includes("@")) {
      return res.status(500).json({
        mensaje: "La reserva actualizada no tiene un email válido.",
      });
    }

    if (changes.length > 0) {
      try {
        const nameToUse = updatedReservation.name || name || reservation.name;
        await sendEmail({
          to: emailToSend,
          subject: "Modificación de Reserva",
          html: updateEmailTemplate(nameToUse, changes),
        });
      } catch (emailError) {
        return res.status(500).json({ mensaje: "Error enviando el email." });
      }
    }

    return res.status(200).json({
      mensaje: "Reserva actualizada exitosamente.",
      reserva: updatedReservation.get(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating reservation.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateReservationStatus: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || isNaN(Number(id))) {
      return res
        .status(400)
        .json({ mensaje: "El ID de la reserva es inválido." });
    }

    if (!status || !["pendiente", "confirmada", "cancelada"].includes(status)) {
      return res
        .status(400)
        .json({ mensaje: "El estado proporcionado no es válido." });
    }

    const reservation = await Reservation.findByPk(Number(id));
    if (!reservation) {
      return res.status(404).json({ mensaje: "Reserva no encontrada." });
    }

    const updatedReservation = await reservation.update({ status });

    const { email, name } = reservation.get();

    if (!email || !email.trim() || !email.includes("@")) {
      return res.status(500).json({
        mensaje: "La reserva actualizada no tiene un email válido.",
      });
    }

    try {
      const emailContent = reservationStatusEmailTemplate(
        name || "Cliente",
        status,
      );
      await sendEmail({
        to: email,
        subject: "Actualización de Estado de tu Reserva",
        html: emailContent,
      });
    } catch (emailError) {
      return res.status(500).json({ mensaje: "Error enviando el email." });
    }

    return res.status(200).json({
      mensaje: "El estado de la reserva se actualizó exitosamente.",
      reserva: updatedReservation.get(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating reservation status.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
