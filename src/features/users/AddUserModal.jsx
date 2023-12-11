import { Button, Modal, PasswordInput, ScrollArea, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useCreateUserMutation } from "src/api/user";
import BrandsMultiSelect from "src/features/brands/BrandsMultiSelect";
import CompaniesSelect from "src/features/companies/CompaniesSelect";
import DepartmentsSelect from "src/features/departments/DepartmentsSelect";
import RolesSelect from "src/features/roles/RolesSelect";

const AddUserModal = ({ isOpen = false, onClose = () => {} }) => {
  const createUserMutation = useCreateUserMutation();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "Abcd1234",
      company: "",
      brands: [],
      department: "",
      roleAndPermissions: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (form.isDirty("company")) {
      form.setFieldValue("brands", []);
    }
  }, [form.values.company]);

  const handleSubmit = (values) => {
    createUserMutation.mutate(values, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  const renderBrandsSelect = !!form.values.company && (
    <BrandsMultiSelect multiSelectProps={{ label: "brands", ...(form.values.brands.length === 0 && { required: true }), ...form.getInputProps("brands") }} queryObject={{ company: form.values.company }} />
  );

  return (
    <Modal centered title={"create user"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <ScrollArea h={400}>
          <Stack>
            <TextInput required label="name" data-autofocus {...form.getInputProps("name")} />
            <TextInput required type="email" label="email" {...form.getInputProps("email")} />
            <PasswordInput required label="password" {...form.getInputProps("password")} />
            <CompaniesSelect selectProps={{ required: true, label: "company", ...form.getInputProps("company") }} />
            {renderBrandsSelect}
            <DepartmentsSelect selectProps={{ required: true, label: "department", ...form.getInputProps("department") }} />
            <RolesSelect selectProps={{ required: true, label: "role", ...form.getInputProps("roleAndPermissions") }} />
            <Switch label="is active" {...form.getInputProps("isActive", { type: "checkbox" })} />
          </Stack>
        </ScrollArea>

        <Button fullWidth type="submit" mt={"md"} loading={createUserMutation.isPending}>
          Create user
        </Button>
      </form>
    </Modal>
  );
};

export default AddUserModal;
