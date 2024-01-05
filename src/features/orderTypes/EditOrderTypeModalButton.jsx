import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditOrderTypeModal from "./EditOrderTypeModal";

const EditOrderTypeModalButton = ({ orderType }) => {
  const [editOrderTypeModalOpened, { open: openEditOrderTypeModal, close: closeEditOrderTypeModal }] = useDisclosure(false);

  return (
    <>
      <EditOrderTypeModal isOpen={editOrderTypeModalOpened} onClose={closeEditOrderTypeModal} orderType={orderType} />

      <ActionIcon variant="subtle" onClick={openEditOrderTypeModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </>
  );
};

export default EditOrderTypeModalButton;
