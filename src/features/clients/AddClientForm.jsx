import { Button, Grid, Group, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateClientMutation } from "src/api/client";
import capitalizeLetters from "src/utils/capitalizeLetters";
import BrandsSelect from "src/features/brands/BrandsSelect";
import AccountManagersSelect from "src/features/users/AccountManagersSelect";

const AddClientForm = () => {
  const createClientMutation = useCreateClientMutation();

  const navigate = useNavigate();

  const form = useForm({ initialValues: { title: "", email: "", password: "", phone: "", notes: "", brand: "", user: "" } });

  useEffect(() => {
    if (form.isDirty("brand")) {
      form.setFieldValue("user", null);
    }
  }, [form.values.brand]);

  const handlePhone = (e) => form.setFieldValue("phone", e.target.value.replace(/[^0-9/]/g, ""));

  const handleSubmit = (values) => {
    createClientMutation.mutate(values, { onSuccess: ({ data }) => navigate(`/clients/${data._id}`) });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid grow align="flex-end">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BrandsSelect selectProps={{ required: true, label: "select brand", ...form.getInputProps("brand") }} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <AccountManagersSelect selectProps={{ required: true, label: "select manager", ...form.getInputProps("user") }} queryObject={form.values.brand && { brands: { $in: form.values.brand } }} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <TextInput required label={capitalizeLetters("client name")} {...form.getInputProps("title")} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <TextInput type="email" required label={capitalizeLetters("client email")} {...form.getInputProps("email")} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <TextInput type="tel" required label={capitalizeLetters("client phone")} {...form.getInputProps("phone")} onChange={handlePhone} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 12 }}>
          <Textarea rows={4} label={capitalizeLetters("add notes (optional)")} {...form.getInputProps("notes")} />
        </Grid.Col>
      </Grid>

      <Group justify="flex-end" mt={"lg"}>
        <Button color="red" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit" loading={createClientMutation.isPending}>
          Create client
        </Button>
      </Group>
    </form>
  );
};

export default AddClientForm;
