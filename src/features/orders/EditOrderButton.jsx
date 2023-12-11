import { ActionIcon, Tooltip } from "@mantine/core";
import { upperFirst, useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditOrder from "./EditOrder";

const EditOrderButton = ({ order, compact = false }) => {
  const canUpdateOrder = true;

  const [editOrderOpened, { open: openEditOrder, close: closeEditOrder }] = useDisclosure(false);

  if (canUpdateOrder) {
    return (
      <>
        <EditOrder isOpen={editOrderOpened} onClose={closeEditOrder} order={order} compact={compact} />

        <Tooltip label={upperFirst("update order")} withArrow>
          <ActionIcon variant="light" color="yellow" onClick={openEditOrder}>
            <IconPencil size={18} />
          </ActionIcon>
        </Tooltip>
      </>
    );
  }
};

export default EditOrderButton;
