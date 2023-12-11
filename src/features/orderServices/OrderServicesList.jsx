import { Badge, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import EditOrderServiceModalButton from "./EditOrderServiceModalButton";

const OrderServicesList = ({ orderServices = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {orderServices.map((orderService) => {
        return (
          <Paper key={orderService._id} p={"sm"} withBorder>
            <Group gap={"sm"}>
              <div style={{ flex: 1 }}>
                <Text fw={500} tt={"capitalize"}>
                  {orderService.title}
                </Text>

                {orderService.isActive ? <Badge color="teal">active</Badge> : <Badge color="red">inactive</Badge>}
              </div>

              <EditOrderServiceModalButton orderService={orderService} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default OrderServicesList;
