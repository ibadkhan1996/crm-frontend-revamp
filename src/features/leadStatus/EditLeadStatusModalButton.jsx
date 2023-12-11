import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import EditLeadStatusModal from "./EditLeadStatusModal";

const EditLeadStatusModalButton = ({ leadStatus }) => {
  const [editLeadStatusModalOpened, { open: openEditLeadStatusModal, close: closeEditLeadStatusModal }] = useDisclosure(false);

  return (
    <>
      <EditLeadStatusModal isOpen={editLeadStatusModalOpened} onClose={closeEditLeadStatusModal} leadStatus={leadStatus} />

      <ActionIcon variant="subtle" size={"lg"} onClick={openEditLeadStatusModal}>
        <IconEdit strokeWidth={1.25} style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </>
  );
};

export default EditLeadStatusModalButton;
