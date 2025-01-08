import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import menuRouter from "./api/menu";
import reservationRouter from "./api/reservations";
import { errorHandler } from "./middleware/error-handler";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Enable CORS
app.use(cors({ origin: "*" })); // Update this for stricter control in production

// Middleware for JSON parsing
app.use(express.json());

// Debugging Middleware: Logs incoming requests
app.use((req, res, next) => {
  next();
});

// Middleware to validate Content-Type
app.use((req, res, next) => {
  if (
    req.method !== "GET" &&
    req.headers["content-type"] !== "application/json"
  ) {
    return res
      .status(400)
      .json({ error: "Invalid Content-Type. Expected application/json" });
  }
  next();
});

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).send("Servidor backend funcionando");
});

// API Routes
app.use("/api/menu", menuRouter);
app.use("/api/reservations", reservationRouter);

// Error Handling Middleware
app.use(errorHandler); // Dedicated middleware for consistent error responses

// Start the Server
app.listen(PORT, "0.0.0.0", () => {});

export default app;
