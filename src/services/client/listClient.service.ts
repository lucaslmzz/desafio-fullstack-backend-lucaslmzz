import { Client } from "../../entities/client.entity";
import setDataSourceConfig from "../../data-source";

import { listClientSchema } from "../../schemas/clients.schema";

const listClientService = async (): Promise<Client[] | any> => {
  const clientRepository = setDataSourceConfig.getRepository(Client);
  const listclient = await clientRepository.find();

  const listClients = await listClientSchema.validate(listclient, {
    stripUnknown: true,
  });

  return listClients;
};

export default listClientService;
