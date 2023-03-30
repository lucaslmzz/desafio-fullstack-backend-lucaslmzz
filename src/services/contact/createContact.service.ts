import setDataSourceConfig from "../../data-source";

import {
  createContactSchema,
  createContactReturnSchema,
} from "../../schemas/contacts.schema";
import { IContactRequest, IContactResponse } from "../../interfaces/contacts";
import { Contact } from "../../entities/contact.entity";
import { Client } from "../../entities/client.entity";

export const createContactService = async (
  contactData: IContactRequest,
  idUser: any
): Promise<IContactResponse | any> => {
  const { email } = contactData;
  const contactRepository = setDataSourceConfig.getRepository(Contact);
  const clientRepository = setDataSourceConfig.getRepository(Client);
  const emailExist = await contactRepository.findOneBy({ email: email });

  const clientFound = await clientRepository.findOne({
    where: { id: idUser },
    withDeleted: true,
  });

  if (!clientFound) {
    return [{ message: "Client not found" }, 404];
  }
  const contact = contactRepository.create({
    ...contactData,
    client: clientFound!,
  });

  if (emailExist) {
    return [{ message: "Contact already exists" }, 409];
  }

  await contactRepository.save(contact);

  const ContactResponse = await createContactReturnSchema.validate(contact, {
    stripUnknown: true,
  });

  return [ContactResponse, 201];
};
