import { Button, Grid, Group, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "src/api/order";
import capitalizeLetters from "src/utils/capitalizeLetters";
import BrandsSelect from "src/features/brands/BrandsSelect";
import ClientsByBrandSelect from "src/features/clients/ClientsByBrandSelect";
import OrderServicesTagsInput from "src/features/orderServices/OrdersServicesTagsInput";
import OrderTypesSelect from "src/features/orderTypes/OrderTypesSelect";
import PaymentGatewaysSelect from "src/features/paymentGateways/PaymentGatewaysSelect";
import PaymentTypesSelect from "src/features/paymentTypes/PaymentTypesSelect";

const AddOrderForm = () => {
  const createOrderMutation = useCreateOrderMutation();

  const navigate = useNavigate();

  const form = useForm({ initialValues: { paymentType: "", brand: "", client: "", salesEmail: "", amount: 0, orderType: "", paymentGateway: "", services: [] } });

  useEffect(() => {
    if (form.isDirty("brand")) {
      form.setFieldValue("client", null);
    }
  }, [form.values.brand]);

  const handleSubmit = (values) => {
    createOrderMutation.mutate(values, { onSuccess: ({ data }) => navigate(`/orders/${data._id}`) });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid grow align="flex-end">
        <Grid.Col span={{ base: 12, sm: 6, lg: form.values.brand ? 4 : 6 }}>
          <PaymentTypesSelect selectProps={{ required: true, label: "select payment type", selectValue: "title", ...form.getInputProps("paymentType") }} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: form.values.brand ? 4 : 6 }}>
          <BrandsSelect selectProps={{ required: true, label: "select brand", ...form.getInputProps("brand") }} />
        </Grid.Col>
        {form.values.brand && (
          <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
            <ClientsByBrandSelect selectProps={{ required: true, label: "select client", selectLabel: "email", limit: 5, ...form.getInputProps("client") }} brandId={form.values.brand} />
          </Grid.Col>
        )}
        <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
          <TextInput type="email" required label={capitalizeLetters("sales person email")} {...form.getInputProps("salesEmail")} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
          <NumberInput required label={capitalizeLetters("order amount")} allowNegative={false} thousandSeparator prefix="$" {...form.getInputProps("amount")} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
          <OrderTypesSelect selectProps={{ required: true, label: "select order type", ...form.getInputProps("orderType") }} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 6 }}>
          <PaymentGatewaysSelect selectProps={{ required: true, label: "select payment gateway", ...form.getInputProps("paymentGateway") }} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 6 }}>
          <OrderServicesTagsInput tagsInputProps={{ required: true, label: "select services", ...form.getInputProps("services") }} />
        </Grid.Col>
      </Grid>

      <Group justify="flex-end" mt={"lg"}>
        <Button color="red" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit" loading={createOrderMutation.isPending}>
          Create order
        </Button>
      </Group>
    </form>
  );
};

export default AddOrderForm;
