import { api } from "@/app/api/config";
import { Reservation, ReservationStatus } from "@/app/types/reservation";

// Fetch all reservations
export async function fetchReservations(): Promise<Reservation[]> {
  const response = await api.get<Reservation[]>("/reservations", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

// Update a reservation's status
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

// Delete a reservation
export async function deleteReservation(id: number): Promise<void> {
  await api.delete("/reservations", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { id }, // Pass the ID in the request body
  });
}
