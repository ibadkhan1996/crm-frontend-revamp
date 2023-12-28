import { Button, Image, Modal, NumberInput, Stack, Switch, TextInput, rem } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { IconPhotoCancel, IconPhotoDown, IconPhotoPlus } from "@tabler/icons-react";
import { useEffect } from "react";
import { useUpdateCategoryMutation } from "src/api/category";
import { SERVER_URL } from "src/constants/SERVER_URL";

const iconProps = { display: "block", size: 80, strokeWidth: 1.25 };

const EditCategoryModal = ({ isOpen = false, onClose = () => {}, category }) => {
  const updateCategoryMutation = useUpdateCategoryMutation();

  const form = useForm({ initialValues: { title: "", minValue: 0, maxValue: 0, isDefault: false, file: null } });

  useEffect(() => {
    form.setValues({ title: category.title, minValue: category.minValue, maxValue: category.maxValue, isDefault: category.isDefault || false, file: category.imgUrl });
  }, [category]);

  const iconPreview = () => {
    if (!!form.values.file) {
      switch (typeof form.values.file) {
        case "string":
          return <Image src={`${SERVER_URL}${form.values.file}`} style={{ width: rem(80), height: rem(80) }} fit="contain" />;

        case "object":
          const iconURL = URL.createObjectURL(form.values.file);

          return <Image src={iconURL} style={{ width: rem(80), height: rem(80) }} fit="contain" onLoad={() => URL.revokeObjectURL(iconURL)} />;

        default:
          return <IconPhotoPlus {...iconProps} />;
      }
    }
  };
  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("minValue", values.minValue);
    formData.append("maxValue", values.maxValue);
    formData.append("isDefault", values.isDefault);

    if (typeof values.file === "object") {
      formData.append("file", values.file);
    }

    updateCategoryMutation.mutate({ categoryId: category._id, payload: formData }, { onSuccess: onClose });
  };

  return (
    <Modal title={"update category"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
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

          <Button type="submit" mt="md" loading={updateCategoryMutation.isPending}>
            Update category
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditCategoryModal;
