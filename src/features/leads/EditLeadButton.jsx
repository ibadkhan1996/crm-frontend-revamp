import { ActionIcon, Tooltip } from "@mantine/core";
import { upperFirst, useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditLead from "./EditLead";

const EditLeadButton = ({ lead, compact = false }) => {
  const canUpdateLead = true;

  const [editLeadOpened, { open: openEditLead, close: closeEditLead }] = useDisclosure(false);

  if (canUpdateLead) {
    return (
      <>
        <EditLead isOpen={editLeadOpened} onClose={closeEditLead} lead={lead} compact={compact} />

        <Tooltip label={upperFirst("update lead")} withArrow>
          <ActionIcon variant="light" color="yellow" onClick={openEditLead}>
            <IconPencil size={18} />
          </ActionIcon>
        </Tooltip>
      </>
    );
  }
};

export default EditLeadButton;
