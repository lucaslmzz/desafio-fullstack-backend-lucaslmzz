import setDataSourceConfig from "../data-source";
import { Client } from "../../entities/client.entity";
import {
  createClientSchema,
  createClientReturnSchema,
} from "../../schemas/clients.schema";
import { AppError } from "../../errors/AppErrors";
import { IClientRequest, IClientResponse } from "../../interfaces/client";

export const createClientService = async (
  clientData: IClientRequest
): Promise<IClientResponse | any> => {
  const { email } = clientData;
  const clientRepository = setDataSourceConfig.getRepository(Client);
  const client = clientRepository.create(clientData);
  const emailExist = await clientRepository.findOneBy({ email: email });

  if (emailExist) {
    return [{ message: "Client already exists" }, 409];
  }
  await clientRepository.save(client);

  const clientResponse = await createClientReturnSchema.validate(client, {
    stripUnknown: true,
  });

  return [clientResponse, 201];
};
