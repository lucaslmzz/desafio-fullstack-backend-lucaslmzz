import { IContactResponse } from "../contacts";

export interface IClientRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IClientResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  isActive: boolean;
  contact: IContactResponse;
}

export interface IClientUpdate {
  name?: string;
  email?: string;
  phone?: string;
}
