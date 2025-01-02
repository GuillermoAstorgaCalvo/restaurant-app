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
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "0987654321",
        date: new Date("2024-01-11T20:00:00"),
        guests: 2,
        status: "confirmada" as ReservationStatus,
      },
    ];

    await Reservation.bulkCreate(reservations);
    console.log("Sample reservations seeded successfully.");
  } catch (error) {
    console.error("Error seeding reservations:", error);
  } finally {
    process.exit();
  }
})();
