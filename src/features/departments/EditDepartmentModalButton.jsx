import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditDepartmentModal from "./EditDepartmentModal";

const EditDepartmentModalButton = ({ department }) => {
  const [editDepartmentModalOpened, { open: openEditDepartmentModal, close: closeEditDepartmentModal }] = useDisclosure(false);

  return (
    <>
      <EditDepartmentModal isOpen={editDepartmentModalOpened} onClose={closeEditDepartmentModal} department={department} />

      <ActionIcon variant="subtle" onClick={openEditDepartmentModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </>
  );
};

export default EditDepartmentModalButton;
