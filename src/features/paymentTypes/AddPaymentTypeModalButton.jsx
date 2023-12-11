import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import AddPaymentTypeModal from "./AddPaymentTypeModal";

const AddPaymentTypeModalButton = () => {
  const [addPaymentTypeModalOpened, { open: openAddPaymentTypeModal, close: closeAddPaymentTypeModal }] = useDisclosure(false);

  return (
    <>
      <AddPaymentTypeModal isOpen={addPaymentTypeModalOpened} onClose={closeAddPaymentTypeModal} />

      <AddButton title="create payment type" subtitle="add a new payment type" onClick={openAddPaymentTypeModal} />
    </>
  );
};

export default AddPaymentTypeModalButton;
