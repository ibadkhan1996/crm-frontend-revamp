import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCreatePaymentGatewayMutation } from "src/api/paymentGateway";

const AddPaymentGatewayModal = ({ isOpen = false, onClose = () => {} }) => {
  const createPaymentGatewayMutation = useCreatePaymentGatewayMutation();

  const form = useForm({ initialValues: { title: "" } });

  const handleSubmit = (values) => {
    createPaymentGatewayMutation.mutate(values, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal centered title={"create payment gateway"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />

          <Button type="submit" mt="md" loading={createPaymentGatewayMutation.isPending}>
            Create payment gateway
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddPaymentGatewayModal;
