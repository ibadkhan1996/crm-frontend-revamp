import { Button, Modal, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";
import { useEffect } from "react";
import { useUpdateClientHealthMutation } from "src/api/clientHealth";
import Select from "src/components/Select";
import { CLASS_NAMES } from "src/constants/CLASS_NAMES";

const classNamesOptions = Object.values(CLASS_NAMES).map((name) => ({ title: name, value: name }));

const EditClientHealthModal = ({ isOpen = false, onClose = () => {}, clientHealth }) => {
  const updateClientHealthMutation = useUpdateClientHealthMutation();

  const form = useForm({ initialValues: { title: "", className: "", isDefault: false } });

  useEffect(() => {
    form.setValues({ title: clientHealth.title, className: clientHealth.className, isDefault: clientHealth.isDefault || false });
  }, [clientHealth]);

  const handleSubmit = (values) => {
    updateClientHealthMutation.mutate({ clientHealthId: clientHealth._id, payload: values }, { onSuccess: onClose });
  };

  return (
    <Modal title={"update client health"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />
          <Select required label="style" data={classNamesOptions} selectLabel="title" selectValue="value" searchable nothingFoundMessage={upperFirst("no results found")} {...form.getInputProps("className")} />
          <Switch label="default client health" description="any other default will be replaced with this" {...form.getInputProps("isDefault", { type: "checkbox" })} />

          <Button type="submit" mt="md" loading={updateClientHealthMutation.isPending}>
            Update client health
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditClientHealthModal;
