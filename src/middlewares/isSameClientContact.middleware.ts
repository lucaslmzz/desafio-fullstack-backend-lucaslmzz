import { Request, Response, NextFunction } from "express";
import setDataSourceConfig from "../data-source";

import { Client } from "../entities/client.entity";
import { Contact } from "../entities/contact.entity";
import { AppError } from "../errors/AppErrors";

export const isSameClientContactMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const clientRepository = setDataSourceConfig.getRepository(Client);
  const contactRepository = setDataSourceConfig.getRepository(Contact);

  const contact = await contactRepository.findOne({
    where: { id: req.params.id },
    withDeleted: true,
  });

  const client: any = clientRepository.findOne({
    where: { id: contact?.client.id },
    withDeleted: true,
  });

  if (!client?.id) {
    throw new AppError("Client not found", 404);
  }

  if (!contact?.id) {
    throw new AppError("Contact not found", 404);
  }

  if (req.client.id === client!.id) {
    return next();
  }

  return [{ message: "You aren't authorized to complete this request" }, 403];
};
