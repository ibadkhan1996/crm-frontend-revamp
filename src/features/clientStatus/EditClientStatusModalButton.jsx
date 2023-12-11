import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import EditClientStatusModal from "./EditClientStatusModal";

const EditClientStatusModalButton = ({ clientStatus }) => {
  const [editClientStatusModalOpened, { open: openEditClientStatusModal, close: closeEditClientStatusModal }] = useDisclosure(false);

  return (
    <>
      <EditClientStatusModal isOpen={editClientStatusModalOpened} onClose={closeEditClientStatusModal} clientStatus={clientStatus} />

      <ActionIcon variant="subtle" size={"lg"} onClick={openEditClientStatusModal}>
        <IconEdit strokeWidth={1.25} style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </>
  );
};

export default EditClientStatusModalButton;
