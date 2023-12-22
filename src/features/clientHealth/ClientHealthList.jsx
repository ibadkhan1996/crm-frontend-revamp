import { Badge, Group, Paper, SimpleGrid, Tooltip } from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";
import { MANTINE_VARIANTS } from "src/constants/CLASS_NAMES";
import EditClientHealthModalButton from "./EditClientHealthModalButton";

const ClientHealthList = ({ clientHealth = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {clientHealth.map((health) => {
        return (
          <Paper key={health._id} p={"sm"} withBorder>
            <Group gap={"sm"}>
              <Group gap={8} mr={"auto"}>
                <Badge color={MANTINE_VARIANTS[health.className]}>{health.title}</Badge>

                {health.isDefault && (
                  <Tooltip label="Default client health" withArrow>
                    <IconChecks size={18} />
                  </Tooltip>
                )}
              </Group>

              <EditClientHealthModalButton clientHealth={health} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default ClientHealthList;
