import { IClientResponse } from "../client";

export interface IContactRequest {
  name: string;
  email: string;
  phone: string;
  client: string;
}

export interface IContactResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  client: IClientResponse;
}

export interface IContactUpdate {
  name?: string;
  email?: string;
  phone?: string;
}
