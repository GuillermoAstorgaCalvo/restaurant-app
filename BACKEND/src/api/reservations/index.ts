import { Router } from "express";
import { getReservations } from "./get";
import { createReservation } from "./post";
import { updateReservation } from "./put";
import { deleteReservation } from "./delete";

const reservationRouter = Router();

reservationRouter.get("/", getReservations);
reservationRouter.post("/", createReservation);
reservationRouter.put("/:id", updateReservation);
reservationRouter.delete("/:id", deleteReservation);

export default reservationRouter;
