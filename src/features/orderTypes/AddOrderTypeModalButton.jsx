import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import AddOrderTypeModal from "./AddOrderTypeModal";

const AddOrderTypeModalButton = () => {
  const [addOrderTypeModalOpened, { open: openAddOrderTypeModal, close: closeAddOrderTypeModal }] = useDisclosure(false);

  return (
    <>
      <AddOrderTypeModal isOpen={addOrderTypeModalOpened} onClose={closeAddOrderTypeModal} />

      <AddButton title="create order type" subtitle="add a new order type" onClick={openAddOrderTypeModal} />
    </>
  );
};

export default AddOrderTypeModalButton;
