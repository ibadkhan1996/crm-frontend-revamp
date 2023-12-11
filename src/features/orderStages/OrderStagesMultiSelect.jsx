import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllOrderStagesQuery } from "src/api/orderStage";
import MultiSelect from "src/components/MultiSelect";

const OrderStagesMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const orderStages = useGetAllOrderStagesQuery(queryObject);

  if (orderStages.isFetching) return <Skeleton height={36} />;

  if (orderStages.isSuccess) return <MultiSelect data={orderStages.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default OrderStagesMultiSelect;
