import { setDataSourceConfig } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { IClientResponse, IClientUpdate } from "../../interfaces/client";
import { createClientReturnSchema } from "../../schemas/clients.schema";

export const updateClientService = async (
  id: number,
  update: IClientUpdate
): Promise<IClientResponse | any> => {
  const clientRepository = setDataSourceConfig.getRepository(Client);

  const client = await clientRepository.findOne({
    where: { id: id },
    withDeleted: true,
  });

  if (!client) {
    return [{ message: "Client not found" }, 404];
  }

  const updatedClient = clientRepository.create({
    ...client,
    ...update,
  });

  await clientRepository.save(updatedClient);

  const clientResponse = await createClientReturnSchema.validate(client, {
    stripUnknown: true,
  });

  return [clientResponse, 200];
};
