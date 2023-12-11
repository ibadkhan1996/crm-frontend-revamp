import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import AddDepartmentModal from "./AddDepartmentModal";

const AddDepartmentModalButton = () => {
  const [addDepartmentModalOpened, { open: openAddDepartmentModal, close: closeAddDepartmentModal }] = useDisclosure(false);

  return (
    <>
      <AddDepartmentModal isOpen={addDepartmentModalOpened} onClose={closeAddDepartmentModal} />

      <AddButton title="create department" subtitle="add a new department" onClick={openAddDepartmentModal} />
    </>
  );
};

export default AddDepartmentModalButton;
