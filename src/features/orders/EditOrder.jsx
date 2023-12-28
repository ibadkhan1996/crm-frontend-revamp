import { Button, Drawer, Flex, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useUpdateOrderMutation } from "src/api/order";
import OrderServicesTagsInput from "src/features/orderServices/OrdersServicesTagsInput";
import OrderStagesByOrderTypeSelect from "src/features/orderStages/OrderStagesByOrderTypeSelect";
import OrderTypesSelect from "src/features/orderTypes/OrderTypesSelect";
import PaymentGatewaysSelect from "src/features/paymentGateways/PaymentGatewaysSelect";
import capitalizeLetters from "src/utils/capitalizeLetters";
import ClientsByAccountManagerSelect from "../clients/ClientsByAccountManagerSelect";

const EditOrder = ({ isOpen = false, onClose = () => {}, compact = false, order }) => {
  const updateOrderMutation = useUpdateOrderMutation();

  const form = useForm({ initialValues: { client: "", salesEmail: "", orderType: "", orderStage: "", amount: 0, paymentGateway: "", services: [], createdAt: "" } });

  useEffect(() => {
    form.setValues({
      client: order.client._id,
      salesEmail: order.salesEmail,
      orderType: order.orderType._id,
      orderStage: order.orderStage?._id,
      amount: order.amount,
      paymentGateway: order.paymentGateway._id,
      services: order.services,
      createdAt: new Date(order.createdAt.split("T")[0]),
    });
  }, [order]);

  const handleSubmit = (values) => {
    const payload = { ...values, createdAt: dayjs(values.createdAt).format("YYYY-MM-DD") };

    updateOrderMutation.mutate({ orderId: order._id, payload }, { onSuccess: onClose });
  };

  const compactFields = () => {
    return (
      <>
        <OrderTypesSelect selectProps={{ label: "order type", ...form.getInputProps("orderType") }} />
        <OrderStagesByOrderTypeSelect selectProps={{ label: "order stage", ...form.getInputProps("orderStage") }} orderTypeId={form.values.orderType} />
      </>
    );
  };

  return compact ? (
    <Modal title={"update order"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {compactFields()}

          <Button type="submit" mt="md" loading={updateOrderMutation.isPending}>
            Update order
          </Button>
        </Stack>
      </form>
    </Modal>
  ) : (
    <Drawer title={"update order"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Flex component="form" direction={"column"} h={"100%"} onSubmit={form.onSubmit(handleSubmit)}>
        <Stack style={{ flex: 1 }}>
          <ClientsByAccountManagerSelect selectProps={{ label: "client", selectLabel: "email", limit: 5, ...form.getInputProps("client") }} accountManagerId={order.user?._id} />
          <TextInput label={capitalizeLetters("sales person email")} {...form.getInputProps("salesEmail")} />
          {compactFields()}
          <NumberInput label={capitalizeLetters("order amount")} allowNegative={false} thousandSeparator prefix="$" {...form.getInputProps("amount")} />
          <PaymentGatewaysSelect selectProps={{ label: "payment gateway", ...form.getInputProps("paymentGateway") }} />
          <OrderServicesTagsInput tagsInputProps={{ label: "services", ...form.getInputProps("services") }} />
          <DateInput label={capitalizeLetters("date")} {...form.getInputProps("createdAt")} />

          <div style={{ position: "sticky", bottom: 16, marginTop: "auto", backgroundColor: "var(--mantine-color-body)", boxShadow: "0 16px 0 0 var(--mantine-color-body)", zIndex: 2 }}>
            <Button fullWidth type="submit" mt="lg" loading={updateOrderMutation.isPending}>
              Update order
            </Button>
          </div>
        </Stack>
      </Flex>
    </Drawer>
  );
};

export default EditOrder;
