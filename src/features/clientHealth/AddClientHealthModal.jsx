import { Button, Modal, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";
import { useCreateClientHealthMutation } from "src/api/clientHealth";
import Select from "src/components/Select";
import { CLASS_NAMES } from "src/constants/CLASS_NAMES";

const classNamesOptions = Object.values(CLASS_NAMES).map((name) => ({ title: name, value: name }));

const AddClientHealthModal = ({ isOpen = false, onClose = () => {} }) => {
  const createClientHealthMutation = useCreateClientHealthMutation();

  const form = useForm({ initialValues: { title: "", className: "", isDefault: false } });

  const handleSubmit = (values) => {
    createClientHealthMutation.mutate(values, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal centered title={"create client health"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />
          <Select required label="style" data={classNamesOptions} selectLabel="title" selectValue="value" searchable nothingFoundMessage={upperFirst("no results found")} {...form.getInputProps("className")} />
          <Switch label="default client health" description="any other default will be replaced with this" {...form.getInputProps("isDefault", { type: "checkbox" })} />

          <Button type="submit" mt="md" loading={createClientHealthMutation.isPending}>
            Create client health
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddClientHealthModal;
