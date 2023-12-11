import { Stack } from "@mantine/core";
import OrderSearchBar from "src/features/orders/OrderSearchBar";
import OrdersSummaryByOrderPaymentType from "src/features/orders/OrdersSummaryByOrderPaymentType";
import OrdersTable from "src/features/orders/OrdersTable";

const Orders = () => {
  return (
    <Stack gap={"lg"}>
      <OrderSearchBar />

      <OrdersSummaryByOrderPaymentType />

      <OrdersTable />
    </Stack>
  );
};

export default Orders;
