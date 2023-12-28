import { Button, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";
import { useCreateLeadStageMutation } from "src/api/leadStage";
import Select from "src/components/Select";
import { CLASS_NAMES } from "src/constants/CLASS_NAMES";

const classNamesOptions = Object.values(CLASS_NAMES).map((name) => ({ title: name, value: name }));

const AddLeadStageModal = ({ isOpen = false, onClose = () => {} }) => {
  const createLeadStageMutation = useCreateLeadStageMutation();

  const form = useForm({ initialValues: { title: "", percentage: 0, className: "" } });

  const handleSubmit = (values) => {
    createLeadStageMutation.mutate(values, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal title={"create lead stage"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />
          <NumberInput required label="percentage" min={0} max={100} clampBehavior="strict" allowNegative={false} suffix="%" {...form.getInputProps("percentage")} />
          <Select required label="style" data={classNamesOptions} selectLabel="title" selectValue="value" searchable nothingFoundMessage={upperFirst("no results found")} {...form.getInputProps("className")} />

          <Button type="submit" mt="md" loading={createLeadStageMutation.isPending}>
            Create lead stage
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddLeadStageModal;
