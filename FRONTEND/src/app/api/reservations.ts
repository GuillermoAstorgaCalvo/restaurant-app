import api from "./index";
import type { Reservation, CreateReservationData } from "@/app/types/index";

export async function createReservation(
  data: CreateReservationData,
): Promise<Reservation> {
  const response = await api.post<Reservation>("/reservations", data);
  return response.data;
}

export async function fetchReservations(): Promise<Reservation[]> {
  const response = await api.get<Reservation[]>("/reservations");
  return response.data;
}

export async function fetchReservationById(id: number): Promise<Reservation> {
  const response = await api.get<Reservation>(`/reservations/${id}`);
  return response.data;
}

export async function updateReservation(
  id: number,
  data: Partial<CreateReservationData>,
): Promise<Reservation> {
  const response = await api.put<Reservation>(`/reservations/${id}`, data);
  return response.data;
}

export async function deleteReservation(id: number): Promise<void> {
  await api.delete(`/reservations/${id}`);
}
