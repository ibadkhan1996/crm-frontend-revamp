import { ActionIcon, Tooltip } from "@mantine/core";
import { upperFirst, useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditCommentModal from "./EditCommentModal";

const EditCommentModalButton = ({ comment }) => {
  const canUpdateComment = true;

  const [editCommentModalOpened, { open: openEditCommentModal, close: closeEditCommentModal }] = useDisclosure(false);

  if (canUpdateComment) {
    return (
      <>
        <EditCommentModal isOpen={editCommentModalOpened} onClose={closeEditCommentModal} comment={comment} />

        <Tooltip label={upperFirst("update comment")} withArrow>
          <ActionIcon variant="subtle" color="yellow" onClick={openEditCommentModal}>
            <IconPencil size={16} />
          </ActionIcon>
        </Tooltip>
      </>
    );
  }
};

export default EditCommentModalButton;
