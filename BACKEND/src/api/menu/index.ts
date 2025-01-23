import { Router } from "express";
import { getMenuItems } from "./get";
import { createMenuItem } from "./post";
import { updateMenuItem } from "./put";
import { deleteMenuItem } from "./delete";

const menuRouter = Router();

menuRouter.get("/", getMenuItems);
menuRouter.post("/", createMenuItem);
menuRouter.put("/:id", updateMenuItem);
menuRouter.delete("/", deleteMenuItem);

export default menuRouter;
