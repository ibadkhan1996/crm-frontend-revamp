import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUpdatePaymentGatewayMutation } from "src/api/paymentGateway";

const EditPaymentGatewayModal = ({ isOpen = false, onClose = () => {}, paymentGateway }) => {
  const updatePaymentGatewayMutation = useUpdatePaymentGatewayMutation();

  const form = useForm({ initialValues: { title: paymentGateway.title } });

  const handleSubmit = (values) => {
    updatePaymentGatewayMutation.mutate({ paymentGatewayId: paymentGateway._id, payload: values }, { onSuccess: onClose });
  };

  return (
    <Modal centered title={"update payment gateway"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />

          <Button type="submit" mt="md" loading={updatePaymentGatewayMutation.isPending}>
            Update payment gateway
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditPaymentGatewayModal;
