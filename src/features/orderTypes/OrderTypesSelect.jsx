import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllOrderTypesQuery } from "src/api/orderType";
import Select from "src/components/Select";

const OrderTypesSelect = ({ selectProps = {}, queryObject = {} }) => {
  const orderTypes = useGetAllOrderTypesQuery(queryObject);

  if (orderTypes.isFetching) return <Skeleton height={36} />;

  if (orderTypes.isSuccess) return <Select data={orderTypes.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default OrderTypesSelect;
