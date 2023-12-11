import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCreateDepartmentMutation } from "src/api/department";

const AddDepartmentModal = ({ isOpen = false, onClose = () => {} }) => {
  const createDepartmentMutation = useCreateDepartmentMutation();

  const form = useForm({ initialValues: { title: "" } });

  const handleSubmit = (values) => {
    createDepartmentMutation.mutate(values, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal centered title={"create department"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />

          <Button type="submit" mt="md" loading={createDepartmentMutation.isPending}>
            Create department
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddDepartmentModal;
