export const cancellationEmailTemplate = (
  name: string,
  date: string
): string => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8f9fa; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #e74c3c; font-size: 24px; margin: 0;">Cancelación de Reserva</h1>
        <p style="color: #7f8c8d; font-size: 14px; margin: 5px 0;">Te notificamos sobre el estado de tu reserva.</p>
      </div>
      <div style="background-color: #ffffff; border: 1px solid #ddd; padding: 15px 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
        <p style="color: #34495e; font-size: 16px; margin: 0 0 10px;">Hola <strong>${name}</strong>,</p>
        <p style="color: #34495e; font-size: 16px; margin: 0 0 20px;">
          Lamentamos informarte que tu reserva programada para el 
          <strong>${date}</strong> ha sido <strong>cancelada</strong>.
        </p>
        <p style="color: #34495e; font-size: 16px; margin: 0 0 20px;">
          Si necesitas ayuda o deseas realizar otra reserva, no dudes en contactarnos.
        </p>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <p style="color: #7f8c8d; font-size: 14px; margin: 5px 0;">Gracias por tu comprensión y esperamos verte pronto.</p>
        <p style="color: #7f8c8d; font-size: 14px; margin: 5px 0;">Estamos aquí para ayudarte en lo que necesites.</p>
      </div>
      <footer style="margin-top: 20px; text-align: center; color: #95a5a6; font-size: 12px;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Mesón Astorga. Todos los derechos reservados.</p>
      </footer>
    </div>
  `;
};
