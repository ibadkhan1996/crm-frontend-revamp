import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllPaymentGatewaysQuery } from "src/api/paymentGateway";
import Select from "src/components/Select";

const PaymentGatewaysSelect = ({ selectProps = {}, queryObject = {} }) => {
  const paymentGateways = useGetAllPaymentGatewaysQuery(queryObject);

  if (paymentGateways.isFetching) return <Skeleton height={36} />;

  if (paymentGateways.isSuccess) return <Select data={paymentGateways.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default PaymentGatewaysSelect;
