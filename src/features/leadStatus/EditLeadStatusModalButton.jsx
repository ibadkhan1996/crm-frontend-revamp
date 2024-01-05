import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditLeadStatusModal from "./EditLeadStatusModal";

const EditLeadStatusModalButton = ({ leadStatus }) => {
  const [editLeadStatusModalOpened, { open: openEditLeadStatusModal, close: closeEditLeadStatusModal }] = useDisclosure(false);

  return (
    <>
      <EditLeadStatusModal isOpen={editLeadStatusModalOpened} onClose={closeEditLeadStatusModal} leadStatus={leadStatus} />

      <ActionIcon variant="subtle" onClick={openEditLeadStatusModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </>
  );
};

export default EditLeadStatusModalButton;
