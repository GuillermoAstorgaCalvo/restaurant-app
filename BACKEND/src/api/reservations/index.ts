import { Router } from "express";
import { getReservations } from "./get";
import { createReservation } from "./post";
import { updateReservation } from "./put";
import { deleteReservation } from "./delete";
import { getTimeSlots } from "./time-slots";
import { getAvailability } from "./availability";
import { validate } from "../../middleware/validate";
import {
  createReservationSchema,
  updateReservationSchema,
} from "../../lib/validations/reservation";

const reservationRouter = Router();

reservationRouter.get("/", getReservations);
reservationRouter.post(
  "/",
  validate(createReservationSchema),
  createReservation,
);
reservationRouter.put(
  "/:id",
  validate(updateReservationSchema),
  updateReservation,
);
reservationRouter.delete("/", deleteReservation);

reservationRouter.get("/time-slots", getTimeSlots);
reservationRouter.get("/availability", getAvailability);

export default reservationRouter;
