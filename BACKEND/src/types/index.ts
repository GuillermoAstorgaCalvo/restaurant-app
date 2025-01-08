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
