import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import menuRouter from "./api/menu";
import reservationRouter from "./api/reservations";
import adminRoutes from "./api/admin";
import { errorHandler } from "./middleware/error-handler";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({ origin: "*", credentials: true }));

app.use(express.json());

app.use((req, res, next) => {
  next();
});

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

app.get("/", (req, res) => {
  res.status(200).send("Servidor backend funcionando");
});

app.use("/api/menu", menuRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

export default app;

if (require.main === module) {
  app.listen(PORT, "0.0.0.0");
}
