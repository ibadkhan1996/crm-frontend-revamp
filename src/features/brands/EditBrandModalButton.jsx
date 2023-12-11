import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import EditBrandModal from "./EditBrandModal";

const EditBrandModalButton = ({ brand }) => {
  const [editBrandModalOpened, { open: openEditBrandModal, close: closeEditBrandModal }] = useDisclosure(false);

  return (
    <>
      <EditBrandModal isOpen={editBrandModalOpened} onClose={closeEditBrandModal} brand={brand} />

      <ActionIcon variant="subtle" size={"lg"} onClick={openEditBrandModal}>
        <IconEdit strokeWidth={1.25} style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </>
  );
};

export default EditBrandModalButton;
