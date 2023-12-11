import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import AddPaymentGatewayModal from "./AddPaymentGatewayModal";

const AddPaymentGatewayModalButton = () => {
  const [addPaymentGatewayModalOpened, { open: openAddPaymentGatewayModal, close: closeAddPaymentGatewayModal }] = useDisclosure(false);

  return (
    <>
      <AddPaymentGatewayModal isOpen={addPaymentGatewayModalOpened} onClose={closeAddPaymentGatewayModal} />

      <AddButton title="create payment gateway" subtitle="add a new payment gateway" onClick={openAddPaymentGatewayModal} />
    </>
  );
};

export default AddPaymentGatewayModalButton;
