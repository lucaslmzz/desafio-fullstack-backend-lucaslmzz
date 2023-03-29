import { Router } from "express";
import {
  createContactsController,
  deleteContactController,
  listContactsController,
  retrieveContactController,
  updateContactController,
} from "../controllers/contact";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

export const contactRouter = Router();

contactRouter.post("", ensureAuthMiddleware, createContactsController);
contactRouter.get("", ensureAuthMiddleware, listContactsController);
contactRouter.get("/:id", ensureAuthMiddleware, retrieveContactController);
contactRouter.patch("/:id", ensureAuthMiddleware, updateContactController);
contactRouter.delete("/:id", ensureAuthMiddleware, deleteContactController);
