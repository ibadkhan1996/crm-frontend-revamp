import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDeleteNoteCategoryMutation } from "src/api/noteCategory";
import capitalizeLetters from "src/utils/capitalizeLetters";

const DeleteNoteCategoryButton = ({ noteCategoryId, redirect = false, actionIconProps = {} }) => {
  const canDeleteNoteCategory = true;

  const deleteNoteCategoryMutation = useDeleteNoteCategoryMutation();

  const navigate = useNavigate();

  const deleteNoteCategoryConfirmationModal = () => {
    modals.openConfirmModal({
      title: capitalizeLetters("delete note category confirmation"),
      centered: true,
      children: <Text size="sm">Are you sure you want to delete this note category? All notes related to this category will also be deleted! </Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteNoteCategoryMutation.mutate(noteCategoryId, { onSuccess: () => redirect && navigate("/notes") });
      },
    });
  };

  if (canDeleteNoteCategory) {
    return (
      <Tooltip label={upperFirst("delete note category")} withArrow>
        <ActionIcon variant="subtle" color="red" onClick={deleteNoteCategoryConfirmationModal} {...actionIconProps}>
          <IconTrash size={18} />
        </ActionIcon>
      </Tooltip>
    );
  }
};

export default DeleteNoteCategoryButton;
