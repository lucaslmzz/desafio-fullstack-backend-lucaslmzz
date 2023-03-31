import express from "express";
import { handleError } from "./errors/handleError";
import { clientRouter } from "./routes/client.routes";
import { contactRouter } from "./routes/contact.routes";
import loginRouter from "./routes/login.routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/clients", clientRouter);
app.use("/login", loginRouter);
app.use("/contacts", contactRouter);

app.use(handleError);

export default app;
