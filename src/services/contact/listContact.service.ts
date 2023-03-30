import { Contact } from "../../entities/contact.entity";
import setDataSourceConfig from "../../data-source";

import { listContactSchema } from "../../schemas/contacts.schema";

const listContactService = async (): Promise<Contact[] | any> => {
  const contactRepository = setDataSourceConfig.getRepository(Contact);
  const listContact = await contactRepository.find();

  const listContacts = await listContactSchema.validate(listContact, {
    stripUnknown: true,
  });

  return listContacts;
};

export default listContactService;
