import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditLeadStageModal from "./EditLeadStageModal";

const EditLeadStageModalButton = ({ leadStage }) => {
  const [editLeadStageModalOpened, { open: openEditLeadStageModal, close: closeEditLeadStageModal }] = useDisclosure(false);

  return (
    <>
      <EditLeadStageModal isOpen={editLeadStageModalOpened} onClose={closeEditLeadStageModal} leadStage={leadStage} />

      <ActionIcon variant="subtle" onClick={openEditLeadStageModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </>
  );
};

export default EditLeadStageModalButton;
