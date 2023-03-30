import { Request, Response, NextFunction } from "express";
import setDataSourceConfig from "../data-source";

import { Client } from "../entities/client.entity";
import { AppError } from "../errors/AppErrors";

export const isSameClientMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const clientRepository = setDataSourceConfig.getRepository(Client);

  const client = await clientRepository.findOne({
    where: { id: req.params.id },
    withDeleted: true,
  });
  if (!client?.id) {
    throw new AppError("Client not found", 404);
  }

  if (req.client.id === client!.id) {
    return next();
  }

  return [{ message: "You aren't authorized to complete this request" }, 403];
};
