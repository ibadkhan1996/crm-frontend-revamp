import { Stack } from "@mantine/core";
import { useSelector } from "react-redux";
import OrderSearchBar from "src/features/orders/OrderSearchBar";
import OrdersSummaryByOrderPaymentType from "src/features/orders/OrdersSummaryByOrderPaymentType";
import OrdersTable from "src/features/orders/OrdersTable";
import { selectOrderSearchQuery } from "src/redux/slice/orderSearchSlice";

const Orders = () => {
  const orderSearchQuery = useSelector(selectOrderSearchQuery);

  return (
    <Stack gap={"lg"}>
      <OrderSearchBar />

      <OrdersSummaryByOrderPaymentType query={orderSearchQuery} />

      <OrdersTable query={orderSearchQuery} />
    </Stack>
  );
};

export default Orders;
