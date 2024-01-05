import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditOrderStageModal from "./EditOrderStageModal";

const EditOrderStageModalButton = ({ orderStage }) => {
  const [editOrderStageModalOpened, { open: openEditOrderStageModal, close: closeEditOrderStageModal }] = useDisclosure(false);

  return (
    <>
      <EditOrderStageModal isOpen={editOrderStageModalOpened} onClose={closeEditOrderStageModal} orderStage={orderStage} />

      <ActionIcon variant="subtle" onClick={openEditOrderStageModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </>
  );
};

export default EditOrderStageModalButton;
