import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import EditPaymentGatewayModalButton from "./EditPaymentGatewayModalButton";

const PaymentGatewaysList = ({ paymentGateways = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {paymentGateways.map((paymentGateway) => {
        return (
          <Paper key={paymentGateway._id} p={"sm"} withBorder>
            <Group gap={"sm"} justify="space-between">
              <Text fw={500} tt={"capitalize"}>
                {paymentGateway.title}
              </Text>

              <EditPaymentGatewayModalButton paymentGateway={paymentGateway} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default PaymentGatewaysList;
