import { Request, Response } from "express";
import { IContactRequest } from "../interfaces/contacts";
import { createContactService } from "../services/contact/createContact.service";
import { deleteContactService } from "../services/contact/deleteContact.service";
import listContactService from "../services/contact/listContact.service";
import { retrieveContactService } from "../services/contact/retrieveContact.service";
import { updateContactService } from "../services/contact/updateContact.service";

export const createContactsController = async (req: any, res: Response) => {
  const ContactData: IContactRequest = req.body;
  const idClient = req.client.id;
  const [Contact, status] = await createContactService(ContactData, idClient);
  return res.status(status).json(Contact);
};

export const listContactsController = async (req: Request, res: Response) => {
  const listContacts = await listContactService();
  return res.status(200).json(listContacts);
};

export const retrieveContactController = async (
  req: Request,
  res: Response
) => {
  const id: any = req.params.id;
  const [Contact, status] = await retrieveContactService(id);
  return res.status(status).json(Contact);
};

export const updateContactController = async (req: Request, res: Response) => {
  const id: any = req.params.id;
  const [Contact, status] = await updateContactService(id, req.body);
  return res.status(status).json(Contact);
};

export const deleteContactController = async (req: Request, res: Response) => {
  const id: any = req.params.id;
  const deletedContact = await deleteContactService(id);
  return res.status(204).json(deletedContact);
};
