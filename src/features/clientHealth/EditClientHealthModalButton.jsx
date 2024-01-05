import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditClientHealthModal from "./EditClientHealthModal";

const EditClientHealthModalButton = ({ clientHealth }) => {
  const [editClientHealthModalOpened, { open: openEditClientHealthModal, close: closeEditClientHealthModal }] = useDisclosure(false);

  return (
    <>
      <EditClientHealthModal isOpen={editClientHealthModalOpened} onClose={closeEditClientHealthModal} clientHealth={clientHealth} />

      <ActionIcon variant="subtle" onClick={openEditClientHealthModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </>
  );
};

export default EditClientHealthModalButton;
