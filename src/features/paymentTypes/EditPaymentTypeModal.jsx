import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUpdatePaymentTypeMutation } from "src/api/paymentType";

const EditPaymentTypeModal = ({ isOpen = false, onClose = () => {}, paymentType }) => {
  const updatePaymentTypeMutation = useUpdatePaymentTypeMutation();

  const form = useForm({ initialValues: { title: paymentType.title } });

  const handleSubmit = (values) => {
    updatePaymentTypeMutation.mutate({ paymentTypeId: paymentType._id, payload: values }, { onSuccess: onClose });
  };

  return (
    <Modal centered title={"update payment type"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />

          <Button type="submit" mt="md" loading={updatePaymentTypeMutation.isPending}>
            Update payment type
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditPaymentTypeModal;
