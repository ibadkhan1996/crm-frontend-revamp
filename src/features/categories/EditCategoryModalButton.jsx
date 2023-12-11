import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import EditCategoryModal from "./EditCategoryModal";

const EditCategoryModalButton = ({ category }) => {
  const [editCategoryModalOpened, { open: openEditCategoryModal, close: closeEditCategoryModal }] = useDisclosure(false);

  return (
    <>
      <EditCategoryModal isOpen={editCategoryModalOpened} onClose={closeEditCategoryModal} category={category} />

      <ActionIcon variant="subtle" size={"lg"} onClick={openEditCategoryModal}>
        <IconEdit strokeWidth={1.25} style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </>
  );
};

export default EditCategoryModalButton;
