import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import EditCompanyModal from "./EditCompanyModal";

const EditCompanyModalButton = ({ company }) => {
  const [editCompanymodalOpened, { open: openEditCompanyModal, close: closeEditCompanyModal }] = useDisclosure(false);

  return (
    <>
      <EditCompanyModal isOpen={editCompanymodalOpened} onClose={closeEditCompanyModal} company={company} />

      <ActionIcon variant="subtle" size={"lg"} onClick={openEditCompanyModal}>
        <IconEdit strokeWidth={1.25} style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </>
  );
};

export default EditCompanyModalButton;
