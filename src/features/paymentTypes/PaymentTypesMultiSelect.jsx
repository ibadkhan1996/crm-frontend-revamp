import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllPaymentTypesQuery } from "src/api/paymentType";
import MultiSelect from "src/components/MultiSelect";

const PaymentTypesMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const paymentTypes = useGetAllPaymentTypesQuery(queryObject);

  if (paymentTypes.isFetching) return <Skeleton height={36} />;

  if (paymentTypes.isSuccess) return <MultiSelect data={paymentTypes.data} tt="capitalize" selectLabel="title" selectValue="title" searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default PaymentTypesMultiSelect;
