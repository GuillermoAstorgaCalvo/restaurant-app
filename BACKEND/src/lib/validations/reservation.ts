import { z } from "zod";

export const createReservationSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder los 50 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/,
      "El nombre contiene caracteres no válidos",
    ),
  email: z.string().email("Email inválido").toLowerCase(),
  phone: z
    .string()
    .regex(
      /^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{3,4})$/,
      "Formato de teléfono inválido. Ejemplo: +34 600 000 000",
    ),
  date: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), "Fecha inválida"),
  guests: z
    .number()
    .int("El número de comensales debe ser un número entero")
    .min(1, "El número de comensales debe ser al menos 1")
    .max(10, "Para grupos mayores a 10 personas, contáctenos directamente"),
  status: z
    .enum(["pendiente", "confirmada", "finalizada", "cancelada"])
    .optional()
    .default("pendiente"),
});

export const updateReservationSchema = createReservationSchema.extend({
  id: z.number().int("El ID debe ser un número entero"),
});
