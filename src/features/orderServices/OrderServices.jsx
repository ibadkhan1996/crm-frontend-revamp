import { Loader, Stack } from "@mantine/core";
import { useGetAllOrderServicesQuery } from "src/api/orderService";
import AddOrderServiceModalButton from "./AddOrderServiceModalButton";
import OrderServicesList from "./OrderServicesList";

const OrderServices = () => {
  const orderServices = useGetAllOrderServicesQuery();

  if (orderServices.isLoading) return <Loader />;

  if (orderServices.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (orderServices.isSuccess && !orderServices.data?.length) return <Placeholder title={"No order services to display"} icon={<IconFiles size={50} />} />;

  return (
    <Stack gap={"xl"}>
      <AddOrderServiceModalButton />

      <OrderServicesList orderServices={orderServices.data} />
    </Stack>
  );
};

export default OrderServices;
