import { Loader, Paper, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllOrderStagesQuery } from "src/api/orderStage";
import Placeholder from "src/components/Placeholder";
import AddOrderStageModalButton from "./AddOrderStageModalButton";
import OrderStagesList from "./OrderStagesList";

const OrderStages = () => {
  const orderStages = useGetAllOrderStagesQuery();

  if (orderStages.isLoading) return <Loader />;

  if (orderStages.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (orderStages.isSuccess && !orderStages.data?.length) return <Placeholder title={"No order stages to display"} icon={<IconFiles size={50} />} />;

  return (
    <Paper withBorder p={"md"}>
      <Stack gap={"xl"}>
        <AddOrderStageModalButton />

        <OrderStagesList orderStages={orderStages.data} />
      </Stack>
    </Paper>
  );
};

export default OrderStages;
