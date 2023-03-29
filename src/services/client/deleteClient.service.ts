import { setDataSourceConfig } from "../../data-source";
import { Client } from "../../entities/client.entity";

export const deleteClientService = async (id: any) => {
  const clientRepository = setDataSourceConfig.getRepository(Client);

  const client = await clientRepository.findOne({
    where: { id: id },
    withDeleted: true,
  });

  if (!client) {
    return [{ message: "Client not found" }, 404];
  }

  if (!client?.isActive) {
    return [{ message: "Client is already inactive" }, 400];
  }

  await clientRepository.softRemove(client);
  const clientDeleted = await clientRepository.save({
    ...client,
    isActive: false,
  });

  return clientDeleted;
};
