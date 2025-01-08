import { validateContactInfo, validateName } from "./contact-info";
import { validateGuestsCount } from "./guests";
import { validateReservationTime } from "./reservation-time";
import { validateSpecialDates } from "./special-dates";
import { validateTimeSlot } from "./time-slots";
import { validateTableCapacity } from "./table-availability";
import { validateReservationLimits } from "./reservation-limits";
import { validateGroupSize } from "./group-size";
import { validateCancellationLimits } from "./cancellations";
import { validateConsecutiveDays } from "./consecutive-days";
import { validatePeakHours } from "./peak-hours";
import { validateSeasonalRules } from "./seasonal";

export * from "./reservation-limits";
export * from "./group-size";
export * from "./cancellations";
export * from "./consecutive-days";
export * from "./special-dates";
export * from "./table-availability";
export * from "./time-slots";
export * from "./contact-info";
export * from "./reservation-time";
export * from "./guests";
export * from "./peak-hours";
export * from "./seasonal";

interface ValidationResult {
  valid: boolean;
  error?: string;
  details?: any;
}

export async function validateAllBusinessRules(
  date: Date,
  email: string,
  phone: string,
  guests: number,
  name: string,
): Promise<ValidationResult> {
  try {
    // 1. Validaciones básicas
    const validations: ValidationResult[] = [
      validateContactInfo(email, phone),
      validateName(name),
      validateGuestsCount(guests),
      validateReservationTime(date),
      validateSpecialDates(date),
      validateTimeSlot(date),
      await validateTableCapacity(guests),
    ];

    // Verificar validaciones básicas
    for (const validation of validations) {
      if (!validation.valid) return validation;
    }

    // 2. Validaciones de negocio
    const businessValidations: Promise<ValidationResult>[] = [
      validateReservationLimits(email, phone),
      validateGroupSize(date, guests),
      validateCancellationLimits(email),
      validateConsecutiveDays(email, date),
      validatePeakHours(date),
    ];

    // Ejecutar validaciones de negocio en paralelo
    const results = await Promise.all(businessValidations);
    for (const result of results) {
      if (!result.valid) return result;
    }

    // 3. Validaciones estacionales y especiales
    const seasonalValidation = validateSeasonalRules(date, guests);
    if (!seasonalValidation.valid) return seasonalValidation;

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: "Error interno durante la validación",
    };
  }
}
