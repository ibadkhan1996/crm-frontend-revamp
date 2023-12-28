import { Button, Modal, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";
import { useCreateLeadStatusMutation } from "src/api/leadStatus";
import Select from "src/components/Select";
import { CLASS_NAMES } from "src/constants/CLASS_NAMES";

const classNamesOptions = Object.values(CLASS_NAMES).map((name) => ({ title: name, value: name }));

const AddLeadStatusModal = ({ isOpen = false, onClose = () => {} }) => {
  const createLeadStatusMutation = useCreateLeadStatusMutation();

  const form = useForm({ initialValues: { title: "", className: "", isDefault: false } });

  const handleSubmit = (values) => {
    createLeadStatusMutation.mutate(values, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal title={"create lead status"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />
          <Select required label="style" data={classNamesOptions} selectLabel="title" selectValue="value" searchable nothingFoundMessage={upperFirst("no results found")} {...form.getInputProps("className")} />
          <Switch label="default lead status" description="any other default will be replaced with this" {...form.getInputProps("isDefault", { type: "checkbox" })} />

          <Button type="submit" mt="md" loading={createLeadStatusMutation.isPending}>
            Create lead status
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddLeadStatusModal;
