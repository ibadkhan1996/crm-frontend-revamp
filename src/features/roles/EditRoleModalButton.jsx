import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditRoleModal from "./EditRoleModal";

const EditRoleModalButton = ({ role }) => {
  const [editRoleModalOpened, { open: openEditRoleModal, close: closeEditRoleModal }] = useDisclosure(false);

  return (
    <>
      <EditRoleModal isOpen={editRoleModalOpened} onClose={closeEditRoleModal} role={role} />

      <ActionIcon variant="subtle" onClick={openEditRoleModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </>
  );
};

export default EditRoleModalButton;
