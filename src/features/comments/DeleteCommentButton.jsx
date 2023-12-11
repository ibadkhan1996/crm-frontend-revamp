import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { useDeleteCommentMutation } from "src/api/comment";
import capitalizeLetters from "src/utils/capitalizeLetters";

const DeleteCommentButton = ({ commentId }) => {
  const canDeleteComment = true;

  const deleteCommentMutation = useDeleteCommentMutation();

  const deleteCommentConfirmationModal = () => {
    modals.openConfirmModal({
      title: capitalizeLetters("delete comment confirmation"),
      centered: true,
      children: <Text size="sm">Are you sure you want to delete this comment?</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteCommentMutation.mutate(commentId);
      },
    });
  };

  if (canDeleteComment) {
    return (
      <Tooltip label={upperFirst("delete comment")} withArrow>
        <ActionIcon variant="subtle" color="red" onClick={deleteCommentConfirmationModal}>
          <IconTrash size={16} />
        </ActionIcon>
      </Tooltip>
    );
  }
};

export default DeleteCommentButton;
