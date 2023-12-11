import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import AddUserModal from "./AddUserModal";

const AddUserModalButton = () => {
  const [addUserModalOpened, { open: openAddUserModal, close: closeAddUserModal }] = useDisclosure(false);

  return (
    <>
      <AddUserModal isOpen={addUserModalOpened} onClose={closeAddUserModal} />

      <AddButton title="create user" subtitle="add a new user" onClick={openAddUserModal} />
    </>
  );
};

export default AddUserModalButton;
