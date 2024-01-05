import { Loader, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllPaymentGatewaysQuery } from "src/api/paymentGateway";
import Placeholder from "src/components/Placeholder";
import AddPaymentGatewayModalButton from "./AddPaymentGatewayModalButton";
import PaymentGatewaysList from "./PaymentGatewaysList";

const PaymentGateways = () => {
  const paymentGateways = useGetAllPaymentGatewaysQuery();

  if (paymentGateways.isLoading) return <Loader />;

  if (paymentGateways.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (paymentGateways.isSuccess && !paymentGateways.data?.length) return <Placeholder title={"No payment gateways to display"} icon={<IconFiles size={50} />} />;

  return (
    <Stack gap={"xl"}>
      <AddPaymentGatewayModalButton />

      <PaymentGatewaysList paymentGateways={paymentGateways.data} />
    </Stack>
  );
};

export default PaymentGateways;
