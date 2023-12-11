import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import AddCompanyModal from "./AddCompanyModal";

const AddCompanyModalButton = () => {
  const [addCompanymodalOpened, { open: openAddCompanyModal, close: closeAddCompanyModal }] = useDisclosure(false);

  return (
    <>
      <AddCompanyModal isOpen={addCompanymodalOpened} onClose={closeAddCompanyModal} />

      <AddButton title="create company" subtitle="add a new company" onClick={openAddCompanyModal} />
    </>
  );
};

export default AddCompanyModalButton;
