import { setDataSourceConfig } from "../../data-source";
import { Contact } from "../../entities/contact.entity";

export const deleteContactService = async (id: any) => {
  const contactRepository = setDataSourceConfig.getRepository(Contact);
  const contact = await contactRepository.findOne({
    where: { id: id },
  });

  if (!contact) {
    return [{ message: "Contact not found" }, 404];
  }

  await contactRepository.delete(id);
};
