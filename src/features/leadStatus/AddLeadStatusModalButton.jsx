import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import AddLeadStatusModal from "./AddLeadStatusModal";

const AddLeadStatusModalButton = () => {
  const [addLeadStatusModalOpened, { open: openAddLeadStatusModal, close: closeAddLeadStatusModal }] = useDisclosure(false);

  return (
    <>
      <AddLeadStatusModal isOpen={addLeadStatusModalOpened} onClose={closeAddLeadStatusModal} />

      <AddButton title="create lead status" subtitle="add a new lead status" onClick={openAddLeadStatusModal} />
    </>
  );
};

export default AddLeadStatusModalButton;
