import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import EditPaymentTypeModalButton from "./EditPaymentTypeModalButton";

const PaymentTypesList = ({ paymentTypes = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {paymentTypes.map((paymentType) => {
        return (
          <Paper key={paymentType._id} p={"sm"} withBorder>
            <Group gap={"sm"} justify="space-between">
              <Text fw={500} tt={"capitalize"}>
                {paymentType.title}
              </Text>

              <EditPaymentTypeModalButton paymentType={paymentType} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default PaymentTypesList;
