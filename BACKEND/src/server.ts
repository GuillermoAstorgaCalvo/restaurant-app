import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import menuRouter from "./api/menu";
import reservationRouter from "./api/reservations";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Enable CORS
app.use(cors({ origin: "*" })); // Allows requests from any origin. Update this if you want stricter control.

// Middleware
app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).send("Servidor backend funcionando");
});

// API Routes
app.use("/api/menu", menuRouter);
app.use("/api/reservations", reservationRouter);

// Error Handling Middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error encountered:", err.message || err);
    res.status(err.status || 500).json({
      error: "An unexpected error occurred.",
      message: err.message || "Internal Server Error",
    });
  }
);

// Start the Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
