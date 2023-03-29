import { setDataSourceConfig } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { IContactResponse, IContactUpdate } from "../../interfaces/contacts";
import { createContactReturnSchema } from "../../schemas/contacts.schema";

export const updateContactService = async (
  id: number,
  update: IContactUpdate
): Promise<IContactResponse | any> => {
  const contactRepository = setDataSourceConfig.getRepository(Contact);

  const contact = await contactRepository.findOne({
    where: { id: id },
    withDeleted: true,
  });

  if (!contact) {
    return [{ message: "Contact not found" }, 404];
  }

  const updatedContact = contactRepository.create({
    ...contact,
    ...update,
  });

  await contactRepository.save(updatedContact);

  const contactResponse = await createContactReturnSchema.validate(contact, {
    stripUnknown: true,
  });

  return [contactResponse, 200];
};
