import { Group } from "@mantine/core";
import DeleteOrderButton from "./DeleteOrderButton";
import EditOrderButton from "./EditOrderButton";

const OrdersTableRowActions = ({ order }) => {
  return (
    <Group gap={"sm"} justify="center">
      <EditOrderButton order={order} compact />

      <DeleteOrderButton orderId={order._id} />
    </Group>
  );
};

export default OrdersTableRowActions;
