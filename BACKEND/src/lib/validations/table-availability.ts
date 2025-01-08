// Configuración de mesas
const TABLE_CONFIG = {
  small: { capacity: 2, count: 4 }, // 4 mesas de 2 personas
  medium: { capacity: 4, count: 6 }, // 6 mesas de 4 personas
  large: { capacity: 6, count: 2 }, // 2 mesas de 6 personas
};

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
