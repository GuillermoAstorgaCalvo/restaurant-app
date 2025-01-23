export function validateContactInfo(email: string, phone: string) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return {
      valid: false,
      error: "El email proporcionado no es válido",
    };
  }

  const phoneRegex =
    /^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{3,4})$/;
  const cleanPhone = phone.replace(/\s+/g, "");

  if (!phoneRegex.test(cleanPhone)) {
    return {
      valid: false,
      error:
        "Por favor, introduce un número de teléfono válido (ej: +34 600 000 000)",
    };
  }

  return { valid: true };
}

export function validateName(name: string) {
  if (!name?.trim()) {
    return {
      valid: false,
      error: "El nombre es obligatorio",
    };
  }

  if (name.length < 2) {
    return {
      valid: false,
      error: "El nombre debe tener al menos 2 caracteres",
    };
  }

  if (name.length > 50) {
    return {
      valid: false,
      error: "El nombre no puede exceder los 50 caracteres",
    };
  }

  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/;
  if (!nameRegex.test(name)) {
    return {
      valid: false,
      error: "El nombre contiene caracteres no válidos",
    };
  }

  return { valid: true };
}
