import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import EditRoleModal from "./EditRoleModal";

const EditRoleModalButton = ({ role }) => {
  const [editRoleModalOpened, { open: openEditRoleModal, close: closeEditRoleModal }] = useDisclosure(false);

  return (
    <>
      <EditRoleModal isOpen={editRoleModalOpened} onClose={closeEditRoleModal} role={role} />

      <ActionIcon variant="subtle" size={"lg"} onClick={openEditRoleModal}>
        <IconEdit strokeWidth={1.25} style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </>
  );
};

export default EditRoleModalButton;
