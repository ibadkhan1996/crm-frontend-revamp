import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditUserModal from "./EditUserModal";

const EditUserModalButton = ({ user }) => {
  const [editUserModalOpened, { open: openEditUserModal, close: closeEditUserModal }] = useDisclosure(false);

  return (
    <>
      <EditUserModal isOpen={editUserModalOpened} onClose={closeEditUserModal} user={user} />

      <ActionIcon variant="subtle" onClick={openEditUserModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </>
  );
};

export default EditUserModalButton;
