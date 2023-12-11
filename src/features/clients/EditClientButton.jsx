import { ActionIcon, Tooltip } from "@mantine/core";
import { upperFirst, useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditClient from "./EditClient";

const EditClientButton = ({ client, compact = false }) => {
  const canUpdateClient = true;

  const [editClientOpened, { open: openEditClient, close: closeEditClient }] = useDisclosure(false);

  if (canUpdateClient) {
    return (
      <>
        <EditClient isOpen={editClientOpened} onClose={closeEditClient} client={client} compact={compact} />

        <Tooltip label={upperFirst("update client")} withArrow>
          <ActionIcon variant="light" color="yellow" onClick={openEditClient}>
            <IconPencil size={18} />
          </ActionIcon>
        </Tooltip>
      </>
    );
  }
};

export default EditClientButton;
