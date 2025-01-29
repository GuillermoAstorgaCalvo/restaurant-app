export const updateEmailTemplate = (
  name: string,
  changes: string[]
): string => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8f9fa; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2c3e50; font-size: 24px; margin: 0;">Actualización de Reserva</h1>
        <p style="color: #7f8c8d; font-size: 14px; margin: 5px 0;">Gracias por confiar en nuestro restaurante.</p>
      </div>
      <div style="background-color: #ffffff; border: 1px solid #ddd; padding: 15px 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
        <p style="color: #34495e; font-size: 16px; margin: 0 0 10px;">Hola <strong>${name}</strong>,</p>
        <p style="color: #34495e; font-size: 16px; margin: 0 0 20px;">Los siguientes detalles de tu reserva han sido actualizados:</p>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${changes
            .map(
              (change) => `
            <li style="background-color: #f8f9fa; margin-bottom: 10px; padding: 10px 15px; border: 1px solid #ddd; border-radius: 6px; color: #2c3e50; font-size: 14px;">
              ${change}
            </li>`
            )
            .join("")}
        </ul>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <p style="color: #7f8c8d; font-size: 14px; margin: 5px 0;">Si tienes alguna pregunta, no dudes en contactarnos.</p>
        <p style="color: #7f8c8d; font-size: 14px; margin: 5px 0;">¡Gracias por elegir nuestro restaurante!</p>
      </div>
      <footer style="margin-top: 20px; text-align: center; color: #95a5a6; font-size: 12px;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Mesón Astorga. Todos los derechos reservados.</p>
      </footer>
    </div>
  `;
};
