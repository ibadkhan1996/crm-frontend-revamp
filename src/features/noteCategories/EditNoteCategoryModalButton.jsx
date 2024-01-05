import { ActionIcon, Tooltip } from "@mantine/core";
import { upperFirst, useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditNoteCategoryModal from "./EditNoteCategoryModal";

const EditNoteCategoryModalButton = ({ noteCategory, actionIconProps = {} }) => {
  const canUpdateNoteCategory = true;

  const [editNoteCategoryModalOpened, { open: openEditNoteCategoryModal, close: closeEditNoteCategoryModal }] = useDisclosure(false);

  if (canUpdateNoteCategory) {
    return (
      <>
        <EditNoteCategoryModal isOpen={editNoteCategoryModalOpened} onClose={closeEditNoteCategoryModal} noteCategory={noteCategory} />

        <Tooltip label={upperFirst("update note category")} withArrow>
          <ActionIcon variant="subtle" color="yellow" onClick={openEditNoteCategoryModal} {...actionIconProps}>
            <IconPencil size={18} />
          </ActionIcon>
        </Tooltip>
      </>
    );
  }
};

export default EditNoteCategoryModalButton;
