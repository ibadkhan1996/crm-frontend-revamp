import { Button, Modal, PasswordInput, ScrollArea, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUpdateUserMutation } from "src/api/user";
import BrandsMultiSelect from "src/features/brands/BrandsMultiSelect";
import DepartmentsSelect from "src/features/departments/DepartmentsSelect";
import RolesSelect from "src/features/roles/RolesSelect";

const EditUserModal = ({ isOpen = false, onClose = () => {}, user }) => {
  const updateUserMutation = useUpdateUserMutation();

  const form = useForm({
    initialValues: {
      name: user.name,
      email: user.email,
      password: "",
      brands: user.brands.map((brand) => brand._id),
      department: user.department,
      roleAndPermissions: user.roleAndPermissions._id,
      isActive: user.isActive,
    },
  });

  const handleSubmit = (values) => {
    updateUserMutation.mutate(
      { userId: user._id, payload: values },
      {
        onSuccess: () => {
          onClose();
          form.setFieldValue("password", "");
        },
      }
    );
  };

  return (
    <Modal title={"update user"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <ScrollArea h={400}>
          <Stack>
            <TextInput required label="name" data-autofocus {...form.getInputProps("name")} />
            <TextInput required type="email" label="email" {...form.getInputProps("email")} />
            <PasswordInput label="password" placeholder="Type only for a new password" {...form.getInputProps("password")} />
            <BrandsMultiSelect multiSelectProps={{ label: "brands", hidePickedOptions: true, ...(form.values.brands.length === 0 && { required: true }), ...form.getInputProps("brands") }} queryObject={{ company: user.company._id }} />
            <DepartmentsSelect selectProps={{ required: true, label: "department", ...form.getInputProps("department") }} />
            <RolesSelect selectProps={{ required: true, label: "role", ...form.getInputProps("roleAndPermissions") }} />
            <Switch label="is active" {...form.getInputProps("isActive", { type: "checkbox" })} />
          </Stack>
        </ScrollArea>

        <Button fullWidth type="submit" mt={"md"} loading={updateUserMutation.isPending}>
          Update user
        </Button>
      </form>
    </Modal>
  );
};

export default EditUserModal;
