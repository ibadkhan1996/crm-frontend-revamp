import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import EditOrderTypeModal from "./EditOrderTypeModal";

const EditOrderTypeModalButton = ({ orderType }) => {
  const [editOrderTypeModalOpened, { open: openEditOrderTypeModal, close: closeEditOrderTypeModal }] = useDisclosure(false);

  return (
    <>
      <EditOrderTypeModal isOpen={editOrderTypeModalOpened} onClose={closeEditOrderTypeModal} orderType={orderType} />

      <ActionIcon variant="subtle" size={"lg"} onClick={openEditOrderTypeModal}>
        <IconEdit strokeWidth={1.25} style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </>
  );
};

export default EditOrderTypeModalButton;
