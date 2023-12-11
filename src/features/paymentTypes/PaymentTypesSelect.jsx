import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllPaymentTypesQuery } from "src/api/paymentType";
import Select from "src/components/Select";

const PaymentTypesSelect = ({ selectProps = {}, queryObject = {} }) => {
  const paymentTypes = useGetAllPaymentTypesQuery(queryObject);

  if (paymentTypes.isFetching) return <Skeleton height={36} />;

  if (paymentTypes.isSuccess) return <Select data={paymentTypes.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default PaymentTypesSelect;
