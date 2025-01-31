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
  status: ReservationStatus
): Promise<void> {
  try {
    await api.put(
      `/reservations/status/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error updating reservation status:", error);
    throw error;
  }
}

export const updateReservation = async (
  updatedReservation: Reservation
): Promise<Reservation> => {
  try {
    const { data } = await api.put<Reservation>(
      `/reservations/${updatedReservation.id}`,
      updatedReservation
    );
    return data;
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw error;
  }
};

export const cancelReservation = async (id: number): Promise<void> => {
  try {
    await api.post("/reservations/cancel", { id });
  } catch (error) {
    console.error(`Error canceling reservation with ID ${id}:`, error);
    throw error;
  }
};

export async function deleteReservation(id: number): Promise<void> {
  await api.delete("/reservations", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { id },
  });
}
