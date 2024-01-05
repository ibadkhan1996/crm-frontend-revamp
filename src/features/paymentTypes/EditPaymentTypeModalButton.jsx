import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditPaymentTypeModal from "./EditPaymentTypeModal";

const EditPaymentTypeModalButton = ({ paymentType }) => {
  const [editPaymentTypeModalOpened, { open: openEditPaymentTypeModal, close: closeEditPaymentTypeModal }] = useDisclosure(false);

  return (
    <>
      <EditPaymentTypeModal isOpen={editPaymentTypeModalOpened} onClose={closeEditPaymentTypeModal} paymentType={paymentType} />

      <ActionIcon variant="subtle" onClick={openEditPaymentTypeModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </>
  );
};

export default EditPaymentTypeModalButton;
