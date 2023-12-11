import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import EditPaymentGatewayModal from "./EditPaymentGatewayModal";

const EditPaymentGatewayModalButton = ({ paymentGateway }) => {
  const [editPaymentGatewayModalOpened, { open: openEditPaymentGatewayModal, close: closeEditPaymentGatewayModal }] = useDisclosure(false);

  return (
    <>
      <EditPaymentGatewayModal isOpen={editPaymentGatewayModalOpened} onClose={closeEditPaymentGatewayModal} paymentGateway={paymentGateway} />

      <ActionIcon variant="subtle" size={"lg"} onClick={openEditPaymentGatewayModal}>
        <IconEdit strokeWidth={1.25} style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </>
  );
};

export default EditPaymentGatewayModalButton;
