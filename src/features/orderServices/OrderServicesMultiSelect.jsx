import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllOrderServicesQuery } from "src/api/orderService";
import MultiSelect from "src/components/MultiSelect";

const OrderServicesMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const orderServices = useGetAllOrderServicesQuery(queryObject);

  if (orderServices.isFetching) return <Skeleton height={36} />;

  if (orderServices.isSuccess) return <MultiSelect data={orderServices.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default OrderServicesMultiSelect;
