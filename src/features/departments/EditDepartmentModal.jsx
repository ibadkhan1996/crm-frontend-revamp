import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUpdateDepartmentMutation } from "src/api/department";

const EditDepartmentModal = ({ isOpen = false, onClose = () => {}, department }) => {
  const updateDepartmentMutation = useUpdateDepartmentMutation();

  const form = useForm({ initialValues: { title: department.title } });

  const handleSubmit = (values) => {
    updateDepartmentMutation.mutate({ departmentId: department._id, payload: values }, { onSuccess: onClose });
  };

  return (
    <Modal centered title={"update department"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />

          <Button type="submit" mt="md" loading={updateDepartmentMutation.isPending}>
            Update department
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditDepartmentModal;
