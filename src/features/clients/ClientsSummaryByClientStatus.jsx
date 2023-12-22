import { Avatar, Badge, Group, Loader, Paper, SimpleGrid, Text } from "@mantine/core";
import { IconAnalyze, IconAnalyzeFilled, IconAnalyzeOff, IconCheck, IconX } from "@tabler/icons-react";
import { useGetClientsSummaryByClientStatusQuery } from "src/api/client";
import formatCurrency from "src/utils/formatCurrency";
import formatNumber from "src/utils/formatNumber";
import getAbbreviation from "src/utils/getAbbreviation";

const iconProps = { size: 26 };
const icons = {
  "in process": <IconAnalyze {...iconProps} />,
  unresponsive: <IconAnalyzeOff {...iconProps} />,
  hold: <IconAnalyzeFilled {...iconProps} />,
  delivered: <IconCheck {...iconProps} />,
  chargeback: <IconX {...iconProps} />,
  refunded: <IconX {...iconProps} />,
};

const ClientsSummaryByClientStatus = ({ query }) => {
  const clientsSummary = useGetClientsSummaryByClientStatusQuery({ query });

  if (clientsSummary.isLoading) return <Loader />;

  if (clientsSummary.isSuccess && !!clientsSummary.data?.length) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {clientsSummary.data.map(
          (status, i) =>
            i !== 0 && (
              <Paper key={i} withBorder p={"sm"}>
                <Group gap={"sm"}>
                  <Avatar radius={"md"} alt={status.title}>
                    {icons[status.title] ? icons[status.title] : getAbbreviation(status.title)}
                  </Avatar>

                  <div>
                    <Text size="xs" fw={700} c={"dimmed"} tt={"uppercase"}>
                      {status.title}
                    </Text>
                    <Text size="lg">
                      {formatNumber(status.count)} - {formatCurrency(status.amount)}
                    </Text>
                  </div>

                  {!!status.partials && (
                    <Badge color="red" style={{ alignSelf: "flex-end", marginLeft: "auto" }}>
                      R/CBs: {formatCurrency(status.partials)}
                    </Badge>
                  )}
                </Group>
              </Paper>
            )
        )}
      </SimpleGrid>
    );
  }
};

export default ClientsSummaryByClientStatus;
