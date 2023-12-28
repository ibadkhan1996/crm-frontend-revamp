import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDeleteLeadMutation } from "src/api/lead";
import capitalizeLetters from "src/utils/capitalizeLetters";

const DeleteLeadButton = ({ leadId, redirect = false }) => {
  const canDeleteLead = true;

  const deleteLeadMutation = useDeleteLeadMutation();

  const navigate = useNavigate();

  const deleteLeadConfirmationModal = () => {
    modals.openConfirmModal({
      title: capitalizeLetters("delete lead confirmation"),
      centered: true,
      children: <Text size="sm">Are you sure you want to delete this lead?</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteLeadMutation.mutate(leadId, { onSuccess: () => redirect && navigate("/leads") });
      },
    });
  };

  if (canDeleteLead) {
    return (
      <Tooltip label={upperFirst("delete lead")} withArrow>
        <ActionIcon variant="light" color="red" onClick={deleteLeadConfirmationModal}>
          <IconTrash size={18} />
        </ActionIcon>
      </Tooltip>
    );
  }
};

export default DeleteLeadButton;
