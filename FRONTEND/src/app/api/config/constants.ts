export const API_BASE_URL = "/api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    SESSION: "/auth/session",
  },
  RESERVATIONS: {
    LIST: "/reservations",
    RECENT: "/admin/reservations/recent",
  },
  MENU: {
    LIST: "/menu",
  },
} as const;

export const API_ERROR_MESSAGES = {
  GENERAL: "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.",
  UNAUTHORIZED: "No tiene permisos para realizar esta acción.",
  VALIDATION: "Por favor, revise los datos ingresados.",
  NOT_FOUND: "El recurso solicitado no existe.",
  TIMEOUT:
    "La solicitud ha tardado demasiado tiempo. Por favor, inténtelo de nuevo.",
} as const;

export const DEFAULT_API_CONFIG: RequestInit = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include",
};
