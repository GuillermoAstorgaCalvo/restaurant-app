import Reservation, { ReservationStatus } from "../models/reservation";

(async () => {
  try {
    const reservations = [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        date: new Date("2024-01-10T19:00:00"),
        guests: 4,
        status: "pendiente" as ReservationStatus,
        created_at: new Date(), // Use snake_case
        updated_at: new Date(), // Use snake_case
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "0987654321",
        date: new Date("2024-01-11T20:00:00"),
        guests: 2,
        status: "confirmada" as ReservationStatus,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await Reservation.bulkCreate(reservations);
  } catch (error) {
  } finally {
    process.exit();
  }
})();
