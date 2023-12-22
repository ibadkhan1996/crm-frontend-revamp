import { Button, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";
import { useUpdateLeadStageMutation } from "src/api/leadStage";
import Select from "src/components/Select";
import { CLASS_NAMES } from "src/constants/CLASS_NAMES";

const classNamesOptions = Object.values(CLASS_NAMES).map((name) => ({ title: name, value: name }));

const EditLeadStageModal = ({ isOpen = false, onClose = () => {}, leadStage }) => {
  const updateLeadStageMutation = useUpdateLeadStageMutation();

  const form = useForm({ initialValues: { title: leadStage.title, percentage: leadStage.percentage, className: leadStage.className } });

  const handleSubmit = (values) => {
    updateLeadStageMutation.mutate({ leadStageId: leadStage._id, payload: values }, { onSuccess: onClose });
  };

  return (
    <Modal centered title={"update lead stage"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />
          <NumberInput required label="percentage" min={0} max={100} clampBehavior="strict" allowNegative={false} suffix="%" {...form.getInputProps("percentage")} />
          <Select required label="style" data={classNamesOptions} selectLabel="title" selectValue="value" searchable nothingFoundMessage={upperFirst("no results found")} {...form.getInputProps("className")} />

          <Button type="submit" mt="md" loading={updateLeadStageMutation.isPending}>
            Update lead stage
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditLeadStageModal;
