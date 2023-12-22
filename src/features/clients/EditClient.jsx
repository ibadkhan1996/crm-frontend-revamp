import { Button, Drawer, Modal, Stack, TextInput, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useUpdateClientMutation } from "src/api/client";
import ClientHealthSelect from "src/features/clientHealth/ClientHealthSelect";
import ClientStatusSelect from "src/features/clientStatus/ClientStatusSelect";
import AccountManagersSelect from "src/features/users/AccountManagersSelect";
import capitalizeLetters from "src/utils/capitalizeLetters";

const EditClient = ({ isOpen = false, onClose = () => {}, compact = false, client }) => {
  const updateClientMutation = useUpdateClientMutation();

  const form = useForm({ initialValues: { title: "", email: "", phone: "", notes: "", user: "", status: "", health: "", createdAt: "" } });

  useEffect(() => {
    form.setValues({ title: client.title, email: client.email, phone: client.phone, notes: client.notes, user: client.user._id, status: client.status._id, health: client.health._id, createdAt: new Date(client.createdAt.split("T")[0]) });
  }, [client]);

  const handlePhoneChange = (e) => form.setFieldValue("phone", e.target.value.replace(/[^0-9/]/g, ""));

  const handleSubmit = (values) => {
    const payload = { ...values, createdAt: dayjs(values.createdAt).format("YYYY-MM-DD") };

    updateClientMutation.mutate({ clientId: client._id, payload }, { onSuccess: onClose });
  };

  const compactFields = () => {
    return (
      <>
        <AccountManagersSelect selectProps={{ label: "account manager", ...form.getInputProps("user") }} queryObject={{ brands: { $in: client.brand._id } }} />
        <ClientStatusSelect selectProps={{ label: "client status", ...form.getInputProps("status") }} />
        <ClientHealthSelect selectProps={{ label: "client health", ...form.getInputProps("health") }} />
      </>
    );
  };

  return compact ? (
    <Modal centered title={"update client"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {compactFields()}

          <Button type="submit" mt="md" loading={updateClientMutation.isPending}>
            Update client
          </Button>
        </Stack>
      </form>
    </Modal>
  ) : (
    <Drawer title={"update client"} tt={"capitalize"} opened={isOpen} onClose={onClose} position="right">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div>
          <Stack>
            <TextInput label={capitalizeLetters("name")} {...form.getInputProps("title")} />
            <TextInput label={capitalizeLetters("email")} {...form.getInputProps("email")} />
            <TextInput type="tel" label={capitalizeLetters("phone")} {...form.getInputProps("phone")} onChange={handlePhoneChange} />
            {compactFields()}
            <DateInput label={capitalizeLetters("date")} {...form.getInputProps("createdAt")} />
            <Textarea rows={4} label={capitalizeLetters("notes")} {...form.getInputProps("notes")} />
          </Stack>

          <div style={{ position: "sticky", bottom: 16, backgroundColor: "var(--mantine-color-body)", boxShadow: "0 16px 0 0 var(--mantine-color-body)", paddingTop: 16, zIndex: 2 }}>
            <Button fullWidth type="submit" mt="md" loading={updateClientMutation.isPending}>
              Update client
            </Button>
          </div>
        </div>
      </form>
    </Drawer>
  );
};

export default EditClient;
