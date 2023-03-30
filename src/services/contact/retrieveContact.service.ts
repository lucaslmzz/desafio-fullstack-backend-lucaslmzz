import setDataSourceConfig from "../../data-source";

import { Contact } from "../../entities/contact.entity";

import { IContactResponse } from "../../interfaces/contacts";
import { createContactReturnSchema } from "../../schemas/contacts.schema";

export const retrieveContactService = async (
  id: any
): Promise<IContactResponse | any> => {
  const contactRepository = setDataSourceConfig.getRepository(Contact);

  const contact = await contactRepository.findOne({
    where: { id: id },
    withDeleted: true,
  });

  if (!contact) {
    return [{ message: "Contact not found" }, 404];
  }
  const ContactResponse = await createContactReturnSchema.validate(contact, {
    stripUnknown: true,
  });

  return [ContactResponse, 200];
};
