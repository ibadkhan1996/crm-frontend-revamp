import { Badge, Button, ColorPicker, DEFAULT_THEME, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useUpdateNoteCategoryMutation } from "src/api/noteCategory";

const EditNoteCategoryModal = ({ isOpen = false, onClose = () => {}, noteCategory }) => {
  const updateNoteCategoryMutation = useUpdateNoteCategoryMutation();

  const form = useForm({ initialValues: { title: "", icon: "", color: "" } });

  useEffect(() => {
    form.setValues({ title: noteCategory.title, icon: noteCategory?.icon, color: noteCategory?.color });
  }, [noteCategory]);

  const handleSubmit = (values) => {
    updateNoteCategoryMutation.mutate({ noteCategoryId: noteCategory._id, payload: values }, { onSuccess: onClose });
  };

  const COLOR_SWATCHES = Object.entries(DEFAULT_THEME.colors)
    .map(([key, value]) => key !== "dark" && value[4])
    .filter(Boolean);

  return (
    <Modal title={"update note category"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />

          <Stack gap={4}>
            <Badge fullWidth color={form.values.color}>
              color: {form.values.color}
            </Badge>

            <ColorPicker fullWidth withPicker={false} swatches={COLOR_SWATCHES} swatchesPerRow={13} {...form.getInputProps("color")} />
          </Stack>

          <Button type="submit" mt="md" loading={updateNoteCategoryMutation.isPending}>
            Update note category
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditNoteCategoryModal;
