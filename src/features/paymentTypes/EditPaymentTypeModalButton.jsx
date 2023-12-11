import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import EditPaymentTypeModal from "./EditPaymentTypeModal";

const EditPaymentTypeModalButton = ({ paymentType }) => {
  const [editPaymentTypeModalOpened, { open: openEditPaymentTypeModal, close: closeEditPaymentTypeModal }] = useDisclosure(false);

  return (
    <>
      <EditPaymentTypeModal isOpen={editPaymentTypeModalOpened} onClose={closeEditPaymentTypeModal} paymentType={paymentType} />

      <ActionIcon variant="subtle" size={"lg"} onClick={openEditPaymentTypeModal}>
        <IconEdit strokeWidth={1.25} style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </>
  );
};

export default EditPaymentTypeModalButton;
