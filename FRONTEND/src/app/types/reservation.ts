export type ReservationStatus =
  | "pendiente"
  | "confirmada"
  | "finalizada"
  | "cancelada";

export interface Reservation {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  status: ReservationStatus;

  createdAt: string;
  updatedAt: string;
}

export interface CreateReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
}

export interface TimeSlotResponse {
  available: boolean;
  requestedTime: string;
  nextAvailableSlot?: string;
  message?: string;
}

export interface AvailabilityResponse {
  hourly: {
    available: boolean;
    currentCount: number;
    maxCount: number;
  };
  daily: {
    lunch: { start: string; end: string; slots: string[] };
    dinner: { start: string; end: string; slots: string[] };
  };
  date: string;
}
