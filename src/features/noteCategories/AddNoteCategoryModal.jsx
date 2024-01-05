import { Badge, Button, ColorPicker, DEFAULT_THEME, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCreateNoteCategoryMutation } from "src/api/noteCategory";

const AddNoteCategoryModal = ({ isOpen = false, onClose = () => {} }) => {
  const createNoteCategoryMutation = useCreateNoteCategoryMutation();

  const form = useForm({ initialValues: { title: "", icon: "", color: "" } });

  const handleSubmit = (values) => {
    createNoteCategoryMutation.mutate(values, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  const COLOR_SWATCHES = Object.entries(DEFAULT_THEME.colors)
    .map(([key, value]) => key !== "dark" && value[4])
    .filter(Boolean);

  return (
    <Modal title={"create note category"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />

          <Stack gap={4}>
            <Badge fullWidth color={form.values.color}>
              color: {form.values.color}
            </Badge>

            <ColorPicker fullWidth withPicker={false} swatches={COLOR_SWATCHES} swatchesPerRow={13} {...form.getInputProps("color")} />
          </Stack>

          <Button type="submit" mt="md" loading={createNoteCategoryMutation.isPending}>
            Create note category
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddNoteCategoryModal;
