import * as yup from "yup";
import { Schema } from "yup";
import { IClientRequest } from "../interfaces/client";
import { createContactReturnSchema } from "./contacts.schema";

export const createClientSchema: Schema<IClientRequest> = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Mail is required"),
  phone: yup.string().required("Phone is required"),
  password: yup.string().required("Password is required"),
});

export const createClientReturnSchema: any = yup.object().shape({
  id: yup.string(),
  name: yup.string(),
  email: yup.string().email(),
  phone: yup.string(),
  createdAt: yup.string(),
  isActive: yup.boolean(),
  contact: yup.object(),
});

export const listClientSchema = yup.array(createClientReturnSchema);
