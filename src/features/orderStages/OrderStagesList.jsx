import { Badge, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { MANTINE_VARIANTS } from "src/constants/CLASS_NAMES";
import formatNumber from "src/utils/formatNumber";
import EditOrderStageModalButton from "./EditOrderStageModalButton";

const OrderStagesList = ({ orderStages = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }}>
      {orderStages.map((orderStage) => {
        return (
          <Paper key={orderStage._id} p={"sm"} withBorder>
            <Group gap={"sm"}>
              <div style={{ flex: 1 }}>
                <Text fw={500} tt={"capitalize"}>
                  {orderStage.title}
                </Text>
                <Badge color={MANTINE_VARIANTS[orderStage.className]}>{`${orderStage.title} - ${formatNumber(orderStage.percentage)}%`}</Badge>
              </div>

              <EditOrderStageModalButton orderStage={orderStage} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default OrderStagesList;
