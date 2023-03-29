import { Request, Response } from "express";
import { IClientRequest } from "../interfaces/client";
import { createClientService } from "../services/client/createClient.service";
import { deleteClientService } from "../services/client/deleteClient.service";
import listClientService from "../services/client/listClient.service";
import { retrieveClientService } from "../services/client/retrieveClient.service";
import { updateClientService } from "../services/client/updateClient.service";

export const createClientsController = async (req: Request, res: Response) => {
  const clientData: IClientRequest = req.body;
  const [client, status] = await createClientService(clientData);
  return res.status(status).json(client);
};

export const listClientsController = async (req: Request, res: Response) => {
  const listClients = await listClientService();
  return res.status(200).json(listClients);
};

export const retrieveClientController = async (req: Request, res: Response) => {
  const id: any = req.params.id;
  const [client, status] = await retrieveClientService(id);
  return res.status(status).json(client);
};

export const updateClientController = async (req: Request, res: Response) => {
  const id: any = req.params.id;
  const [client, status] = await updateClientService(id, req.body);
  return res.status(status).json(client);
};

export const deleteClientController = async (req: Request, res: Response) => {
  const id: any = req.params.id;
  const deletedClient = await deleteClientService(id);
  return res.status(204).json(deletedClient);
};
