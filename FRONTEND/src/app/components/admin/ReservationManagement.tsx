import { useEffect, useState } from "react";
import {
  fetchReservations,
  updateReservationStatus,
  deleteReservation,
} from "@/app/services/reservationService";
import { Reservation, ReservationStatus } from "@/app/types/reservation";

const ReservationManagement = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const data = await fetchReservations();
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReservations();
  }, []);

  const handleStatusUpdate = async (
    id: number,
    newStatus: ReservationStatus,
  ) => {
    try {
      await updateReservationStatus(id, newStatus);
      setReservations((prev) =>
        prev.map((res) =>
          res.id === id ? { ...res, status: newStatus } : res,
        ),
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteReservation(id);
      setReservations((prev) => prev.filter((res) => res.id !== id));
    } catch (error) {
      console.error("Error deleting reservation:", error);
      alert("Failed to delete reservation. Please try again.");
    }
  };

  const filteredReservations = reservations.filter((res) =>
    filter ? res.status === filter : true,
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reservas</h2>
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">
          Ordenar por estado:
        </label>
        <select
          id="statusFilter"
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="finalizada">Finalizada</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Nombre del cliente</th>
              <th className="border border-gray-300 p-2">Fecha</th>
              <th className="border border-gray-300 p-2">Comensales</th>
              <th className="border border-gray-300 p-2">Estado</th>
              <th className="border border-gray-300 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="border border-gray-300 p-2">
                  {reservation.name}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(reservation.date).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2">
                  {reservation.guests}
                </td>
                <td className="border border-gray-300 p-2">
                  {reservation.status}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() =>
                      handleStatusUpdate(reservation.id, "confirmada")
                    }
                  >
                    Confirmar
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() =>
                      handleStatusUpdate(reservation.id, "cancelada")
                    }
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(reservation.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservationManagement;
