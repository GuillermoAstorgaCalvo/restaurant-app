import { useEffect, useState } from "react";
import {
  fetchReservations,
  updateReservationStatus,
  deleteReservation,
} from "@/app/services/reservationService";
import { Reservation, ReservationStatus } from "@/app/types/reservation";
import ReservationEditForm from "@/app/components/admin/ReservationEditForm";

const ReservationManagement = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("");
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);

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

  const openEditForm = (reservation: Reservation) => {
    setEditingReservation(reservation);
  };

  const closeEditForm = () => {
    setEditingReservation(null);
  };

  const handleSave = async (updatedReservation: Reservation) => {
    try {
      await updateReservationStatus(
        updatedReservation.id,
        updatedReservation.status,
      );
      setReservations((prev) =>
        prev.map((res) =>
          res.id === updatedReservation.id ? updatedReservation : res,
        ),
      );
      closeEditForm();
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "confirmada":
        return "bg-green-100 text-green-800";
      case "finalizada":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const filteredReservations = reservations.filter((res) =>
    filter ? res.status === filter : true,
  );

  return (
    <div className="flex justify-center items-start min-h-screen pt-10">
      <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-6xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Gestión de Reservas
        </h2>
        <div className="mb-6 flex items-center justify-end gap-2">
          <label htmlFor="statusFilter" className="text-gray-700 font-medium">
            Filtrar por estado:
          </label>
          <select
            id="statusFilter"
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 bg-gray-50 p-2 rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todas</option>
            <option value="pendiente">Pendiente</option>
            <option value="confirmada">Confirmada</option>
            <option value="finalizada">Finalizada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
        {loading ? (
          <p className="text-gray-600 text-center">Cargando...</p>
        ) : (
          <table className="w-full table-auto border-collapse rounded-lg shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 text-center font-semibold">Cliente</th>
                <th className="p-3 text-center font-semibold">Fecha</th>
                <th className="p-3 text-center font-semibold">Comensales</th>
                <th className="p-3 text-center font-semibold">Estado</th>
                <th className="p-3 text-center font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 text-center truncate max-w-xs">
                    {reservation.name}
                  </td>
                  <td className="p-3 text-center truncate max-w-xs">
                    {new Date(reservation.date).toLocaleString()}
                  </td>
                  <td className="p-3 text-center">{reservation.guests}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                        reservation.status,
                      )}`}
                    >
                      {reservation.status}
                    </span>
                  </td>
                  <td className="p-3 flex flex-wrap justify-center gap-2">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
                      onClick={() =>
                        handleStatusUpdate(reservation.id, "confirmada")
                      }
                    >
                      Confirmar
                    </button>
                    <button
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm"
                      onClick={() =>
                        handleStatusUpdate(reservation.id, "cancelada")
                      }
                    >
                      Cancelar
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                      onClick={() => openEditForm(reservation)}
                    >
                      Modificar
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
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
        {editingReservation && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <ReservationEditForm
                reservation={editingReservation}
                onSave={handleSave}
                onClose={closeEditForm}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationManagement;
