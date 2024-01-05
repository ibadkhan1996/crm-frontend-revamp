import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditClientStatusModal from "./EditClientStatusModal";

const EditClientStatusModalButton = ({ clientStatus }) => {
  const [editClientStatusModalOpened, { open: openEditClientStatusModal, close: closeEditClientStatusModal }] = useDisclosure(false);

  return (
    <>
      <EditClientStatusModal isOpen={editClientStatusModalOpened} onClose={closeEditClientStatusModal} clientStatus={clientStatus} />

      <ActionIcon variant="subtle" onClick={openEditClientStatusModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </>
  );
};

export default EditClientStatusModalButton;
