import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditCategoryModal from "./EditCategoryModal";

const EditCategoryModalButton = ({ category }) => {
  const [editCategoryModalOpened, { open: openEditCategoryModal, close: closeEditCategoryModal }] = useDisclosure(false);

  return (
    <>
      <EditCategoryModal isOpen={editCategoryModalOpened} onClose={closeEditCategoryModal} category={category} />

      <ActionIcon variant="subtle" onClick={openEditCategoryModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </>
  );
};

export default EditCategoryModalButton;
