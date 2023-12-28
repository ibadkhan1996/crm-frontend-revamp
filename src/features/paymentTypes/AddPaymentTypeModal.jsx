import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCreatePaymentTypeMutation } from "src/api/paymentType";

const AddPaymentTypeModal = ({ isOpen = false, onClose = () => {} }) => {
  const createPaymentTypeMutation = useCreatePaymentTypeMutation();

  const form = useForm({ initialValues: { title: "" } });

  const handleSubmit = (values) => {
    createPaymentTypeMutation.mutate(values, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal title={"create payment type"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />

          <Button type="submit" mt="md" loading={createPaymentTypeMutation.isPending}>
            Create payment type
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddPaymentTypeModal;
