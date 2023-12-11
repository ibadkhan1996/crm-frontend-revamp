import { ActionIcon, Tooltip } from "@mantine/core";
import { upperFirst, useDisclosure } from "@mantine/hooks";
import { IconMessagePlus } from "@tabler/icons-react";
import AddCommentModal from "src/features/comments/AddCommentModal";

const AddCommentModalButton = ({ documentId, documentReference }) => {
  const canAddComment = true;

  const [addCommentModalOpened, { open: openAddCommentModal, close: closeAddCommentModal }] = useDisclosure(false);

  if (canAddComment) {
    return (
      <>
        <AddCommentModal isOpen={addCommentModalOpened} onClose={closeAddCommentModal} documentId={documentId} documentReference={documentReference} user={"63bb19a37b1a15b66418cfef"} />

        <Tooltip label={upperFirst("add comment")} withArrow>
          <ActionIcon variant="light" onClick={openAddCommentModal}>
            <IconMessagePlus size={18} />
          </ActionIcon>
        </Tooltip>
      </>
    );
  }
};

export default AddCommentModalButton;
