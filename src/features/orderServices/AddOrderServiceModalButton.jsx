import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import AddOrderServiceModal from "./AddOrderServiceModal";

const AddOrderServiceModalButton = () => {
  const [addOrderServiceModalOpened, { open: openAddOrderServiceModal, close: closeAddOrderServiceModal }] = useDisclosure(false);

  return (
    <>
      <AddOrderServiceModal isOpen={addOrderServiceModalOpened} onClose={closeAddOrderServiceModal} />

      <AddButton title="create order service" subtitle="add a new order service" onClick={openAddOrderServiceModal} />
    </>
  );
};

export default AddOrderServiceModalButton;
