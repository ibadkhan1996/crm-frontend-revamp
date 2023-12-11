import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllPaymentGatewaysQuery } from "src/api/paymentGateway";
import MultiSelect from "src/components/MultiSelect";

const PaymentGatewaysMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const paymentGateways = useGetAllPaymentGatewaysQuery(queryObject);

  if (paymentGateways.isFetching) return <Skeleton height={36} />;

  if (paymentGateways.isSuccess) return <MultiSelect data={paymentGateways.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default PaymentGatewaysMultiSelect;
