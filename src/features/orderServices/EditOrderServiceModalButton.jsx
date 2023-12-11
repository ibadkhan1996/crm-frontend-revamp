import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import EditOrderServiceModal from "./EditOrderServiceModal";

const EditOrderServiceModalButton = ({ orderService }) => {
  const [editOrderServiceModalOpened, { open: openEditOrderServiceModal, close: closeEditOrderServiceModal }] = useDisclosure(false);

  return (
    <>
      <EditOrderServiceModal isOpen={editOrderServiceModalOpened} onClose={closeEditOrderServiceModal} orderService={orderService} />

      <ActionIcon variant="subtle" size={"lg"} onClick={openEditOrderServiceModal}>
        <IconEdit strokeWidth={1.25} style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </>
  );
};

export default EditOrderServiceModalButton;
