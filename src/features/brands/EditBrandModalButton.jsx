import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditBrandModal from "./EditBrandModal";

const EditBrandModalButton = ({ brand }) => {
  const [editBrandModalOpened, { open: openEditBrandModal, close: closeEditBrandModal }] = useDisclosure(false);

  return (
    <>
      <EditBrandModal isOpen={editBrandModalOpened} onClose={closeEditBrandModal} brand={brand} />

      <ActionIcon variant="subtle" onClick={openEditBrandModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </>
  );
};

export default EditBrandModalButton;
