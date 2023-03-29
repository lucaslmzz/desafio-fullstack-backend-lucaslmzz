import { Router } from "express";
import createLoginController from "../controllers/login";

const loginRouter = Router();

loginRouter.post("/", createLoginController);

export default loginRouter;
