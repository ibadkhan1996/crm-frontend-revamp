import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllOrderStagesQuery } from "src/api/orderStage";
import Select from "src/components/Select";

const OrderStagesSelect = ({ selectProps = {}, queryObject = {} }) => {
  const orderStages = useGetAllOrderStagesQuery(queryObject);

  if (orderStages.isFetching) return <Skeleton height={36} />;

  if (orderStages.isSuccess) return <Select data={orderStages.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default OrderStagesSelect;
