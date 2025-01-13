import { api } from "../config";
import { Reservation, CreateReservationData } from "@/app/types/reservation";

export const reservationsApi = {
  getAll: async (): Promise<Reservation[]> => {
    try {
      const { data } = await api.get<Reservation[]>("/reservations");
      return data;
    } catch (error) {
      console.error("Error fetching reservations:", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Reservation> => {
    try {
      const { data } = await api.get<Reservation>(`/reservations/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching reservation with ID ${id}:`, error);
      throw error;
    }
  },

  create: async (reservation: CreateReservationData): Promise<Reservation> => {
    try {
      const { data } = await api.post<Reservation>(
        "/reservations",
        reservation,
      );
      return data;
    } catch (error) {
      console.error("Error creating reservation:", error);
      throw error;
    }
  },

  update: async (id: number, status: string): Promise<Reservation> => {
    try {
      const { data } = await api.put<Reservation>(`/reservations/${id}`, {
        status,
      });
      return data;
    } catch (error) {
      console.error(`Error updating reservation with ID ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/reservations/${id}`);
    } catch (error) {
      console.error(`Error deleting reservation with ID ${id}:`, error);
      throw error;
    }
  },
};
