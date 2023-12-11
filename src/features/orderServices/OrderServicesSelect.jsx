import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllOrderServicesQuery } from "src/api/orderService";
import Select from "src/components/Select";

const OrderServicesSelect = ({ selectProps = {}, queryObject = {} }) => {
  const orderServices = useGetAllOrderServicesQuery(queryObject);

  if (orderServices.isFetching) return <Skeleton height={36} />;

  if (orderServices.isSuccess) return <Select data={orderServices.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default OrderServicesSelect;
