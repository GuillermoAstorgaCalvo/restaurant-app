import { Router, RequestHandler } from "express";
import { getMenuItems } from "./get";
import { createMenuItem } from "./post";
import { updateMenuItem } from "./put";
import { deleteMenuItem } from "./delete";

const router = Router();

// Ensure handlers are typed as `RequestHandler`
router.get("/", getMenuItems as RequestHandler); // GET /api/menu
router.post("/", createMenuItem as RequestHandler); // POST /api/menu
router.put("/:id", updateMenuItem as RequestHandler); // PUT /api/menu/:id
router.delete("/:id", deleteMenuItem as RequestHandler); // DELETE /api/menu/:id

export default router;
