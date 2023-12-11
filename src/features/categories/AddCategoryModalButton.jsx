import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import AddCategoryModal from "./AddCategoryModal";

const AddCategoryModalButton = () => {
  const [addCategoryModalOpened, { open: openAddCategoryModal, close: closeAddCategoryModal }] = useDisclosure(false);

  return (
    <>
      <AddCategoryModal isOpen={addCategoryModalOpened} onClose={closeAddCategoryModal} />

      <AddButton title="create category" subtitle="add a new category" onClick={openAddCategoryModal} />
    </>
  );
};

export default AddCategoryModalButton;
