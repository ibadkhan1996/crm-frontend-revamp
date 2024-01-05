import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditCompanyModal from "./EditCompanyModal";

const EditCompanyModalButton = ({ company }) => {
  const [editCompanymodalOpened, { open: openEditCompanyModal, close: closeEditCompanyModal }] = useDisclosure(false);

  return (
    <>
      <EditCompanyModal isOpen={editCompanymodalOpened} onClose={closeEditCompanyModal} company={company} />

      <ActionIcon variant="subtle" onClick={openEditCompanyModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </>
  );
};

export default EditCompanyModalButton;
