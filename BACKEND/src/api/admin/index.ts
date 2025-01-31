import { Router } from "express";
import { login } from "./login";

const adminRouter = Router();

adminRouter.post("/login", login);

export default adminRouter;
