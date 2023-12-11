import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDeleteClientMutation } from "src/api/client";
import capitalizeLetters from "src/utils/capitalizeLetters";

const DeleteClientButton = ({ clientId, redirect = false }) => {
  const canDeleteClient = true;

  const deleteClientMutation = useDeleteClientMutation();

  const navigate = useNavigate();

  const deleteClientConfirmationModal = () => {
    modals.openConfirmModal({
      title: capitalizeLetters("delete client confirmation"),
      centered: true,
      children: <Text size="sm">Are you sure you want to delete this client? All orders and comments related to this client will be deleted!</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteClientMutation.mutate(clientId, { onSuccess: () => redirect && navigate("/clients") });
      },
    });
  };

  if (canDeleteClient) {
    return (
      <Tooltip label={upperFirst("delete client")} withArrow>
        <ActionIcon variant="light" color="red" onClick={deleteClientConfirmationModal}>
          <IconTrash size={18} />
        </ActionIcon>
      </Tooltip>
    );
  }
};

export default DeleteClientButton;
