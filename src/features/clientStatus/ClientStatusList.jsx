import { Badge, Group, Paper, SimpleGrid, Tooltip } from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";
import { MANTINE_VARIANTS } from "src/constants/CLASS_NAMES";
import EditClientStatusModalButton from "./EditClientStatusModalButton";

const ClientStatusList = ({ clientStatus = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {clientStatus.map((status) => {
        return (
          <Paper key={status._id} p={"sm"} withBorder>
            <Group gap={"sm"}>
              <Group gap={8} mr={"auto"}>
                <Badge color={MANTINE_VARIANTS[status.className]}>{status.title}</Badge>

                {status.isDefault && (
                  <Tooltip label="Default client status" withArrow>
                    <IconChecks size={18} />
                  </Tooltip>
                )}
              </Group>

              <EditClientStatusModalButton clientStatus={status} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default ClientStatusList;
