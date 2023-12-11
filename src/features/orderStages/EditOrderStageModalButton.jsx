import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import EditOrderStageModal from "./EditOrderStageModal";

const EditOrderStageModalButton = ({ orderStage }) => {
  const [editOrderStageModalOpened, { open: openEditOrderStageModal, close: closeEditOrderStageModal }] = useDisclosure(false);

  return (
    <>
      <EditOrderStageModal isOpen={editOrderStageModalOpened} onClose={closeEditOrderStageModal} orderStage={orderStage} />

      <ActionIcon variant="subtle" size={"lg"} onClick={openEditOrderStageModal}>
        <IconEdit strokeWidth={1.25} style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </>
  );
};

export default EditOrderStageModalButton;
