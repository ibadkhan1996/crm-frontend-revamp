import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDeleteOrderMutation } from "src/api/order";
import capitalizeLetters from "src/utils/capitalizeLetters";

const DeleteOrderButton = ({ orderId, redirect = false }) => {
  const canDeleteOrder = true;

  const deleteOrderMutation = useDeleteOrderMutation();

  const navigate = useNavigate();

  const deleteOrderConfirmationModal = () => {
    modals.openConfirmModal({
      title: capitalizeLetters("delete order confirmation"),
      centered: true,
      children: <Text size="sm">Are you sure you want to delete this order?</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteOrderMutation.mutate(orderId, { onSuccess: () => redirect && navigate("/orders") });
      },
    });
  };

  if (canDeleteOrder) {
    return (
      <Tooltip label={upperFirst("delete order")} withArrow>
        <ActionIcon variant="light" color="red" onClick={deleteOrderConfirmationModal}>
          <IconTrash size={18} />
        </ActionIcon>
      </Tooltip>
    );
  }
};

export default DeleteOrderButton;
