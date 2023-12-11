import { Loader, Paper, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllPaymentTypesQuery } from "src/api/paymentType";
import Placeholder from "src/components/Placeholder";
import AddPaymentTypeModalButton from "./AddPaymentTypeModalButton";
import PaymentTypesList from "./PaymentTypesList";

const PaymentTypes = () => {
  const paymentTypes = useGetAllPaymentTypesQuery();

  if (paymentTypes.isLoading) return <Loader />;

  if (paymentTypes.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (paymentTypes.isSuccess && !paymentTypes.data?.length) return <Placeholder title={"No payment types to display"} icon={<IconFiles size={50} />} />;

  return (
    <Paper withBorder p={"md"}>
      <Stack gap={"xl"}>
        <AddPaymentTypeModalButton />

        <PaymentTypesList paymentTypes={paymentTypes.data} />
      </Stack>
    </Paper>
  );
};

export default PaymentTypes;
