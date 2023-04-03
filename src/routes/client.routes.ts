import { Router } from "express";
import {
  createClientsController,
  deleteClientController,
  listClientsController,
  retrieveClientController,
  updateClientController,
} from "../controllers/client";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import { isSameClientMiddleware } from "../middlewares/isSameClient.middleware";

export const clientRouter = Router();

clientRouter.post("", createClientsController);
clientRouter.get("", listClientsController);
clientRouter.get("/:id", ensureAuthMiddleware, retrieveClientController);
clientRouter.patch(
  "/:id",
  ensureAuthMiddleware,
  updateClientController
);
clientRouter.delete(
  "/:id",
  ensureAuthMiddleware,
  deleteClientController
);
