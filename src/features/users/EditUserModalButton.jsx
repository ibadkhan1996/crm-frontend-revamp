import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import EditUserModal from "./EditUserModal";

const EditUserModalButton = ({ user }) => {
  const [editUserModalOpened, { open: openEditUserModal, close: closeEditUserModal }] = useDisclosure(false);

  return (
    <>
      <EditUserModal isOpen={editUserModalOpened} onClose={closeEditUserModal} user={user} />

      <ActionIcon variant="subtle" size={"lg"} onClick={openEditUserModal}>
        <IconEdit strokeWidth={1.25} style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </>
  );
};

export default EditUserModalButton;
