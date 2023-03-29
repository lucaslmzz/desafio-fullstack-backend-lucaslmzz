import * as yup from "yup";
import { Schema } from "yup";
import { IContactRequest } from "../interfaces/contacts";
import { createClientReturnSchema } from "./clients.schema";

export const createContactSchema: Schema<IContactRequest> = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Mail is required"),
  phone: yup.string().required("Phone is required"),
  client: yup.string().required("Client is required"),
});

export const createContactReturnSchema = yup.object().shape({
  id: yup.string(),
  name: yup.string(),
  email: yup.string().email(),
  phone: yup.string(),
  createdAt: yup.string(),
  client: createClientReturnSchema,
});

export const listContactSchema = yup.array(createContactReturnSchema);
