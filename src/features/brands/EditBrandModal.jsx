import { Button, Image, Modal, Stack, TextInput, rem } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { IconPhotoCancel, IconPhotoDown, IconPhotoPlus } from "@tabler/icons-react";
import { useUpdateBrandMutation } from "src/api/brand";
import { SERVER_URL } from "src/constants/SERVER_URL";

const iconProps = { display: "block", size: 80, strokeWidth: 1.25 };

const EditBrandModal = ({ isOpen = false, onClose = () => {}, brand }) => {
  const updateBrandMutation = useUpdateBrandMutation();

  const form = useForm({ initialValues: { title: brand.title, acronym: brand.acronym, file: brand.imgUrl } });

  const iconPreview = () => {
    switch (typeof form.values.file) {
      case "string":
        return <Image src={`${SERVER_URL}${form.values.file}`} style={{ width: rem(80), height: rem(80) }} fit="contain" />;

      case "object":
        const iconURL = URL.createObjectURL(form.values.file);

        return <Image src={iconURL} style={{ width: rem(80), height: rem(80) }} fit="contain" onLoad={() => URL.revokeObjectURL(iconURL)} />;

      default:
        return <IconPhotoPlus {...iconProps} />;
    }
  };

  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("acronym", values.acronym);

    if (typeof values.file === "object") {
      formData.append("file", values.file);
    }

    updateBrandMutation.mutate({ brandId: brand._id, payload: formData }, { onSuccess: onClose });
  };

  return (
    <Modal centered title={"update brand"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
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
          <TextInput required label="acronym" {...form.getInputProps("acronym")} />

          <Button type="submit" mt="md" loading={updateBrandMutation.isPending}>
            Update brand
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditBrandModal;
