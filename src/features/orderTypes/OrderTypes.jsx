import { Loader, Paper, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllOrderTypesQuery } from "src/api/orderType";
import Placeholder from "src/components/Placeholder";
import AddOrderTypeModalButton from "./AddOrderTypeModalButton";
import OrderTypesList from "./OrderTypesList";

const OrderTypes = () => {
  const orderTypes = useGetAllOrderTypesQuery();

  if (orderTypes.isLoading) return <Loader />;

  if (orderTypes.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (orderTypes.isSuccess && !orderTypes.data?.length) return <Placeholder title={"No order types to display"} icon={<IconFiles size={50} />} />;

  return (
    <Paper withBorder p={"md"}>
      <Stack gap={"xl"}>
        <AddOrderTypeModalButton />

        <OrderTypesList orderTypes={orderTypes.data} />
      </Stack>
    </Paper>
  );
};

export default OrderTypes;
