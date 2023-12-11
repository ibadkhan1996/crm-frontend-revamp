import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import AddClientStatusModal from "./AddClientStatusModal";

const AddClientStatusModalButton = () => {
  const [addClientStatusModalOpened, { open: openAddClientStatusModal, close: closeAddClientStatusModal }] = useDisclosure(false);

  return (
    <>
      <AddClientStatusModal isOpen={addClientStatusModalOpened} onClose={closeAddClientStatusModal} />

      <AddButton title="create client status" subtitle="add a new client status" onClick={openAddClientStatusModal} />
    </>
  );
};

export default AddClientStatusModalButton;
