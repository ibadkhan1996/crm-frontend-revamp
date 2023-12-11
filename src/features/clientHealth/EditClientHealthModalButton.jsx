import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import EditClientHealthModal from "./EditClientHealthModal";

const EditClientHealthModalButton = ({ clientHealth }) => {
  const [editClientHealthModalOpened, { open: openEditClientHealthModal, close: closeEditClientHealthModal }] = useDisclosure(false);

  return (
    <>
      <EditClientHealthModal isOpen={editClientHealthModalOpened} onClose={closeEditClientHealthModal} clientHealth={clientHealth} />

      <ActionIcon variant="subtle" size={"lg"} onClick={openEditClientHealthModal}>
        <IconEdit strokeWidth={1.25} style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </>
  );
};

export default EditClientHealthModalButton;
