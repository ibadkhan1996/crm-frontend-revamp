import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import EditDepartmentModal from "./EditDepartmentModal";

const EditDepartmentModalButton = ({ department }) => {
  const [editDepartmentModalOpened, { open: openEditDepartmentModal, close: closeEditDepartmentModal }] = useDisclosure(false);

  return (
    <>
      <EditDepartmentModal isOpen={editDepartmentModalOpened} onClose={closeEditDepartmentModal} department={department} />

      <ActionIcon variant="subtle" size={"lg"} onClick={openEditDepartmentModal}>
        <IconEdit strokeWidth={1.25} style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </>
  );
};

export default EditDepartmentModalButton;
