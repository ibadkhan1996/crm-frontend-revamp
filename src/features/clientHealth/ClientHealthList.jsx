import { Badge, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { MANTINE_VARIANTS } from "src/constants/CLASS_NAMES";
import EditClientHealthModalButton from "./EditClientHealthModalButton";

const ClientHealthList = ({ clientHealth = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {clientHealth.map((health) => {
        return (
          <Paper key={health._id} p={"sm"} withBorder>
            <Group gap={"sm"}>
              <div style={{ flex: 1 }}>
                <Text fw={500} tt={"capitalize"}>
                  {health.title}
                </Text>
                <Badge color={MANTINE_VARIANTS[health.className]}>{health.title}</Badge>
              </div>

              <EditClientHealthModalButton clientHealth={health} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default ClientHealthList;
