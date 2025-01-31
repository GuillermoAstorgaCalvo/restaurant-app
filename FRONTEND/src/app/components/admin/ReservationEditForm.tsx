import { useState } from "react";
import { Reservation, ReservationStatus } from "@/app/types/reservation";

interface ReservationEditFormProps {
  reservation: Reservation;
  onSave: (updatedReservation: Reservation) => void;
  onClose: () => void;
}

const reservationStatuses: ReservationStatus[] = [
  "pendiente",
  "confirmada",
  "finalizada",
  "cancelada",
];

const ReservationEditForm = ({
  reservation,
  onSave,
  onClose,
}: ReservationEditFormProps) => {
  const [formData, setFormData] = useState(reservation);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Modificar Reserva</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 bg-white text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 bg-white text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Teléfono
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 bg-white text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Fecha y Hora
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 bg-white text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="guests" className="block text-sm font-medium mb-1">
              Comensales
            </label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 bg-white text-black"
              required
            >
              {[1, 2, 3, 4].map((guestNumber) => (
                <option key={guestNumber} value={guestNumber}>
                  {guestNumber}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Estado
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 bg-white text-black"
              required
            >
              {reservationStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationEditForm;
