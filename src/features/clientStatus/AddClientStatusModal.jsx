import { Button, Modal, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";
import { useCreateClientStatusMutation } from "src/api/clientStatus";
import Select from "src/components/Select";
import { CLASS_NAMES } from "src/constants/CLASS_NAMES";

const classNamesOptions = Object.values(CLASS_NAMES).map((name) => ({ title: name, value: name }));

const AddClientStatusModal = ({ isOpen = false, onClose = () => {} }) => {
  const createClientStatusMutation = useCreateClientStatusMutation();

  const form = useForm({ initialValues: { title: "", className: "" } });

  const handleSubmit = (values) => {
    createClientStatusMutation.mutate(values, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal centered title={"create client status"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />
          <Select required label="style" data={classNamesOptions} selectLabel="title" selectValue="value" searchable nothingFoundMessage={upperFirst("no results found")} {...form.getInputProps("className")} />
          <Switch label="default client status" description="any other default will be replace with this" />

          <Button type="submit" mt="md" loading={createClientStatusMutation.isPending}>
            Create client status
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddClientStatusModal;
