import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import AddRoleModal from "./AddRoleModal";

const AddRoleModalButton = () => {
  const [addRoleModalOpened, { open: openAddRoleModal, close: closeAddRoleModal }] = useDisclosure(false);

  return (
    <>
      <AddRoleModal isOpen={addRoleModalOpened} onClose={closeAddRoleModal} />

      <AddButton title="create role" subtitle="add a new role" onClick={openAddRoleModal} />
    </>
  );
};

export default AddRoleModalButton;
