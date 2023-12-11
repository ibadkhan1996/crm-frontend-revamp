import { Button, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";
import { useCreateOrderStageMutation } from "src/api/orderStage";
import Select from "src/components/Select";
import { CLASS_NAMES } from "src/constants/CLASS_NAMES";
import OrderTypesSelect from "src/features/orderTypes/OrderTypesSelect";

const classNamesOptions = Object.values(CLASS_NAMES).map((name) => ({ title: name, value: name }));

const AddOrderStageModal = ({ isOpen = false, onClose = () => {} }) => {
  const createOrderStageMutation = useCreateOrderStageMutation();

  const form = useForm({ initialValues: { title: "", percentage: 0, type: "", className: "" } });

  const handleSubmit = (values) => {
    createOrderStageMutation.mutate(values, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal centered title={"create order stage"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />
          <NumberInput required label="percentage" min={0} max={100} clampBehavior="strict" allowNegative={false} suffix="%" {...form.getInputProps("percentage")} />
          <OrderTypesSelect selectProps={{ required: true, label: "order type", ...form.getInputProps("type") }} />
          <Select required label="style" data={classNamesOptions} selectLabel="title" selectValue="value" searchable nothingFoundMessage={upperFirst("no results found")} {...form.getInputProps("className")} />

          <Button type="submit" mt="md" loading={createOrderStageMutation.isPending}>
            Create order stage
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddOrderStageModal;
