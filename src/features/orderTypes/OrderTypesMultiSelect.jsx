import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllOrderTypesQuery } from "src/api/orderType";
import MultiSelect from "src/components/MultiSelect";

const OrderTypesMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const orderTypes = useGetAllOrderTypesQuery(queryObject);

  if (orderTypes.isFetching) return <Skeleton height={36} />;

  if (orderTypes.isSuccess) return <MultiSelect data={orderTypes.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default OrderTypesMultiSelect;
