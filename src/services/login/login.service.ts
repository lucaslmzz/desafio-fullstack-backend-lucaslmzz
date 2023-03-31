import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import setDataSourceConfig from "../../data-source";

import { Client } from "../../entities/client.entity";

export const loginService = async ({ email, password }: any): Promise<any> => {
  const clientRepository = setDataSourceConfig.getRepository(Client);

  const client = await clientRepository.findOneBy({
    email: email,
  });

  if (!client) {
    return [{ message: "Credentials are invalid" }, 403];
  }

  const passwordMatch = await compare(password, client.password);

  if (!passwordMatch) {
    return [{ message: "Credentials are invalid" }, 403];
  }

  if (client.isActive === false) {
    return [400, { message: "Client is not active" } as any];
  }

  const token = jwt.sign({ email: client.email }, process.env.SECRET_KEY!, {
    subject: String(client.id),
    expiresIn: "24h",
  });

  return [200, { token, client } as any];
};
