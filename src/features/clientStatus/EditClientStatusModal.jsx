import { Button, Modal, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";
import { useEffect } from "react";
import { useUpdateClientStatusMutation } from "src/api/clientStatus";
import Select from "src/components/Select";
import { CLASS_NAMES } from "src/constants/CLASS_NAMES";

const classNamesOptions = Object.values(CLASS_NAMES).map((name) => ({ title: name, value: name }));

const EditClientStatusModal = ({ isOpen = false, onClose = () => {}, clientStatus }) => {
  const updateClientStatusMutation = useUpdateClientStatusMutation();

  const form = useForm({ initialValues: { title: "", className: "", isDefault: false } });

  useEffect(() => {
    form.setValues({ title: clientStatus.title, className: clientStatus.className, isDefault: clientStatus.isDefault || false });
  }, [clientStatus]);

  const handleSubmit = (values) => {
    updateClientStatusMutation.mutate({ clientStatusId: clientStatus._id, payload: values }, { onSuccess: onClose });
  };

  return (
    <Modal title={"update client status"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />
          <Select required label="style" data={classNamesOptions} selectLabel="title" selectValue="value" searchable nothingFoundMessage={upperFirst("no results found")} {...form.getInputProps("className")} />
          <Switch label="default client status" description="any other default will be replaced with this" {...form.getInputProps("isDefault", { type: "checkbox" })} />

          <Button type="submit" mt="md" loading={updateClientStatusMutation.isPending}>
            Update client status
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditClientStatusModal;
