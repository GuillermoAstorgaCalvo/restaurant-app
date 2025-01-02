import { Router } from "express";
import { getMenuItems } from "./get";
import { createMenuItem } from "./post";
import { updateMenuItem } from "./put";
import { deleteMenuItem } from "./delete";

const menuRouter = Router();

menuRouter.get("/", getMenuItems); // GET /api/menu
menuRouter.post("/", createMenuItem); // POST /api/menu
menuRouter.put("/:id", updateMenuItem); // PUT /api/menu/:id
menuRouter.delete("/:id", deleteMenuItem); // DELETE /api/menu/:id

export default menuRouter;
