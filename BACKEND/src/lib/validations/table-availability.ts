import { TABLE_CONFIG } from "@/config/restaurant";

export async function validateTableCapacity(guests: number) {
  if (guests <= 0) {
    return {
      valid: false,
      error: "El número de comensales debe ser mayor a 0",
    };
  }

  const maxCapacity =
    TABLE_CONFIG.small.capacity * TABLE_CONFIG.small.count +
    TABLE_CONFIG.medium.capacity * TABLE_CONFIG.medium.count +
    TABLE_CONFIG.large.capacity * TABLE_CONFIG.large.count;

  if (guests > maxCapacity) {
    return {
      valid: false,
      error: `Lo sentimos, no podemos acomodar grupos de más de ${maxCapacity} personas`,
    };
  }

  return { valid: true };
}

export function getRequiredTableType(guests: number) {
  if (guests <= TABLE_CONFIG.small.capacity) return "small";
  if (guests <= TABLE_CONFIG.medium.capacity) return "medium";
  return "large";
}
