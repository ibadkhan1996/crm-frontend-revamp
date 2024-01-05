import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import EditPaymentGatewayModal from "./EditPaymentGatewayModal";

const EditPaymentGatewayModalButton = ({ paymentGateway }) => {
  const [editPaymentGatewayModalOpened, { open: openEditPaymentGatewayModal, close: closeEditPaymentGatewayModal }] = useDisclosure(false);

  return (
    <>
      <EditPaymentGatewayModal isOpen={editPaymentGatewayModalOpened} onClose={closeEditPaymentGatewayModal} paymentGateway={paymentGateway} />

      <ActionIcon variant="subtle" onClick={openEditPaymentGatewayModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </>
  );
};

export default EditPaymentGatewayModalButton;
