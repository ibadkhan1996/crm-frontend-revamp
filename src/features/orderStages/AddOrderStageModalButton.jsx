import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import AddOrderStageModal from "./AddOrderStageModal";

const AddOrderStageModalButton = () => {
  const [addOrderStageModalOpened, { open: openAddOrderStageModal, close: closeAddOrderStageModal }] = useDisclosure(false);

  return (
    <>
      <AddOrderStageModal isOpen={addOrderStageModalOpened} onClose={closeAddOrderStageModal} />

      <AddButton title="create order stage" subtitle="add a new order stage" onClick={openAddOrderStageModal} />
    </>
  );
};

export default AddOrderStageModalButton;
