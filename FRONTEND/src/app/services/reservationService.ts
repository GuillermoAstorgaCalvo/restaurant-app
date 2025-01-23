import { api } from "@/app/api/config";
import { Reservation, ReservationStatus } from "@/app/types/reservation";

export async function fetchReservations(): Promise<Reservation[]> {
  const response = await api.get<Reservation[]>("/reservations", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

export async function updateReservationStatus(
  id: number,
  status: ReservationStatus,
): Promise<void> {
  await api.put(
    `/reservations/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
}

export async function deleteReservation(id: number): Promise<void> {
  await api.delete("/reservations", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { id },
  });
}
