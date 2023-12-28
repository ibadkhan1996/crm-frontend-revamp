import { Button, Modal, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUpdateOrderServiceMutation } from "src/api/orderService";

const EditOrderServiceModal = ({ isOpen = false, onClose = () => {}, orderService }) => {
  const updateOrderServiceMutation = useUpdateOrderServiceMutation();

  const form = useForm({ initialValues: { title: orderService.title, isActive: orderService.isActive } });

  const handleSubmit = (values) => {
    updateOrderServiceMutation.mutate({ orderServiceId: orderService._id, payload: values }, { onSuccess: onClose });
  };

  return (
    <Modal title={"update order service"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />
          <Switch label="is active" {...form.getInputProps("isActive", { type: "checkbox" })} />

          <Button type="submit" mt="md" loading={updateOrderServiceMutation.isPending}>
            Update order service
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditOrderServiceModal;
