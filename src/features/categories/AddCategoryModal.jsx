import { Button, Image, Modal, NumberInput, Stack, Switch, TextInput, rem } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { IconPhotoCancel, IconPhotoDown, IconPhotoPlus } from "@tabler/icons-react";
import { useCreateCategoryMutation } from "src/api/category";

const iconProps = { display: "block", size: 80, strokeWidth: 1.25 };

const AddCategoryModal = ({ isOpen = false, onClose = () => {} }) => {
  const createCategoryMutation = useCreateCategoryMutation();

  const form = useForm({ initialValues: { title: "", minValue: 0, maxValue: 0, isDefault: false, file: null } });

  const iconPreview = () => {
    if (!!form.values.file) {
      const iconURL = URL.createObjectURL(form.values.file);

      return <Image src={iconURL} style={{ width: rem(80), height: rem(80) }} fit="contain" onLoad={() => URL.revokeObjectURL(iconURL)} />;
    }

    return <IconPhotoPlus {...iconProps} />;
  };

  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("minValue", values.minValue);
    formData.append("maxValue", values.maxValue);
    formData.append("isDefault", values.default);
    formData.append("file", values.file);

    createCategoryMutation.mutate(formData, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal centered title={"create category"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Dropzone accept={IMAGE_MIME_TYPE} p={"xs"} w={"max-content"} mx={"auto"} multiple={false} onDrop={(files) => form.setFieldValue("file", files[0])}>
            <Dropzone.Accept>
              <IconPhotoDown {...iconProps} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconPhotoCancel {...iconProps} />
            </Dropzone.Reject>
            <Dropzone.Idle>{iconPreview()}</Dropzone.Idle>
          </Dropzone>

          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />
          <NumberInput required label="minimum value" allowNegative={false} thousandSeparator prefix="$" {...form.getInputProps("minValue")} />
          <NumberInput required label="maximum value" allowNegative={false} thousandSeparator prefix="$" {...form.getInputProps("maxValue")} />
          <Switch label="default client category" description="any other default will be replace with this" {...form.getInputProps("isDefault", { type: "checkbox" })} />

          <Button type="submit" mt="md" loading={createCategoryMutation.isPending}>
            Create category
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
