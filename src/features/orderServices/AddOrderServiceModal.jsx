import { Button, Modal, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCreateOrderServiceMutation } from "src/api/orderService";

const AddOrderServiceModal = ({ isOpen = false, onClose = () => {} }) => {
  const createOrderServiceMutation = useCreateOrderServiceMutation();

  const form = useForm({ initialValues: { title: "", isActive: true } });

  const handleSubmit = (values) => {
    createOrderServiceMutation.mutate(values, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal centered title={"create order service"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />
          <Switch label="is active" {...form.getInputProps("isActive", { type: "checkbox" })} />

          <Button type="submit" mt="md" loading={createOrderServiceMutation.isPending}>
            Create order service
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddOrderServiceModal;
