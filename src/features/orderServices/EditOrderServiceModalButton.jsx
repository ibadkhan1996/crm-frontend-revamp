import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditOrderServiceModal from "./EditOrderServiceModal";

const EditOrderServiceModalButton = ({ orderService }) => {
  const [editOrderServiceModalOpened, { open: openEditOrderServiceModal, close: closeEditOrderServiceModal }] = useDisclosure(false);

  return (
    <>
      <EditOrderServiceModal isOpen={editOrderServiceModalOpened} onClose={closeEditOrderServiceModal} orderService={orderService} />

      <ActionIcon variant="subtle" onClick={openEditOrderServiceModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </>
  );
};

export default EditOrderServiceModalButton;
