import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import EditLeadStageModal from "./EditLeadStageModal";

const EditLeadStageModalButton = ({ leadStage }) => {
  const [editLeadStageModalOpened, { open: openEditLeadStageModal, close: closeEditLeadStageModal }] = useDisclosure(false);

  return (
    <>
      <EditLeadStageModal isOpen={editLeadStageModalOpened} onClose={closeEditLeadStageModal} leadStage={leadStage} />

      <ActionIcon variant="subtle" size={"lg"} onClick={openEditLeadStageModal}>
        <IconEdit strokeWidth={1.25} style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </>
  );
};

export default EditLeadStageModalButton;
