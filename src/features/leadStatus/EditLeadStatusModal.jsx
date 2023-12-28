import { Button, Modal, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";
import { useEffect } from "react";
import { useUpdateLeadStatusMutation } from "src/api/leadStatus";
import Select from "src/components/Select";
import { CLASS_NAMES } from "src/constants/CLASS_NAMES";

const classNamesOptions = Object.values(CLASS_NAMES).map((name) => ({ title: name, value: name }));

const EditLeadStatusModal = ({ isOpen = false, onClose = () => {}, leadStatus }) => {
  const updateLeadStatusMutation = useUpdateLeadStatusMutation();

  const form = useForm({ initialValues: { title: "", className: "", isDefault: false } });

  useEffect(() => {
    form.setValues({ title: leadStatus.title, className: leadStatus.className, isDefault: leadStatus.isDefault || false });
  }, [leadStatus]);

  const handleSubmit = (values) => {
    updateLeadStatusMutation.mutate({ leadStatusId: leadStatus._id, payload: values }, { onSuccess: onClose });
  };

  return (
    <Modal title={"update lead status"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />
          <Select required label="style" data={classNamesOptions} selectLabel="title" selectValue="value" searchable nothingFoundMessage={upperFirst("no results found")} {...form.getInputProps("className")} />
          <Switch label="default lead status" description="any other default will be replaced with this" {...form.getInputProps("isDefault", { type: "checkbox" })} />

          <Button type="submit" mt="md" loading={updateLeadStatusMutation.isPending}>
            Update lead status
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditLeadStatusModal;
