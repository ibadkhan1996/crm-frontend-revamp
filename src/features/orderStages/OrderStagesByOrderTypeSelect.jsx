import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetOrderStagesByOrderTypeQuery } from "src/api/orderStage";
import Select from "src/components/Select";

const OrderStagesByOrderTypeSelect = ({ selectProps = {}, orderTypeId = "" }) => {
  const orderStages = useGetOrderStagesByOrderTypeQuery(orderTypeId);

  if (orderStages.isFetching) return <Skeleton height={36} />;

  if (orderStages.isSuccess) return <Select data={orderStages.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default OrderStagesByOrderTypeSelect;
