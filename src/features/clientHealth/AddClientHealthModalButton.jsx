import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import AddClientHealthModal from "./AddClientHealthModal";

const AddClientHealthModalButton = () => {
  const [addClientHealthModalOpened, { open: openAddClientHealthModal, close: closeAddClientHealthModal }] = useDisclosure(false);

  return (
    <>
      <AddClientHealthModal isOpen={addClientHealthModalOpened} onClose={closeAddClientHealthModal} />

      <AddButton title="create client health" subtitle="add a new client health" onClick={openAddClientHealthModal} />
    </>
  );
};

export default AddClientHealthModalButton;
