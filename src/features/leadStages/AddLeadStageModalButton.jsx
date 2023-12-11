import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import AddLeadStageModal from "./AddLeadStageModal";

const AddLeadStageModalButton = () => {
  const [addLeadStageModalOpened, { open: openAddLeadStageModal, close: closeAddLeadStageModal }] = useDisclosure(false);

  return (
    <>
      <AddLeadStageModal isOpen={addLeadStageModalOpened} onClose={closeAddLeadStageModal} />

      <AddButton title="create lead stage" subtitle="add a new lead stage" onClick={openAddLeadStageModal} />
    </>
  );
};

export default AddLeadStageModalButton;
