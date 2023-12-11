import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import AddBrandModal from "./AddBrandModal";

const AddBrandModalButton = () => {
  const [addBrandModalOpened, { open: openAddBrandModal, close: closeAddBrandModal }] = useDisclosure(false);

  return (
    <>
      <AddBrandModal isOpen={addBrandModalOpened} onClose={closeAddBrandModal} />

      <AddButton title="create brand" subtitle="add a new brand" onClick={openAddBrandModal} />
    </>
  );
};

export default AddBrandModalButton;
