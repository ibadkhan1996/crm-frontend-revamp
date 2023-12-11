import { Avatar, Group, Loader, Paper, SimpleGrid, Text } from "@mantine/core";
import { IconArrowDownLeft, IconArrowUpRight } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useGetOrdersSummaryQuery } from "src/api/order";
import { selectOrderSearchQuery } from "src/redux/slice/orderSearchSlice";
import formatCurrency from "src/utils/formatCurrency";
import formatNumber from "src/utils/formatNumber";

const iconProps = { size: 26 };
const icons = [<IconArrowDownLeft {...iconProps} />, <IconArrowUpRight {...iconProps} />, <IconArrowDownLeft {...iconProps} />];

const OrdersSummaryByOrderPaymentType = () => {
  const orderSearchQuery = useSelector(selectOrderSearchQuery);

  const ordersSummary = useGetOrdersSummaryQuery({ query: orderSearchQuery });

  if (ordersSummary.isLoading) return <Loader />;

  if (ordersSummary.isSuccess && !!ordersSummary.data?.length) {
    return (
      <SimpleGrid cols={2}>
        {ordersSummary.data.map(
          (summary, i) =>
            i !== 0 && (
              <Paper key={i} withBorder p={"sm"}>
                <Group gap={"sm"}>
                  <Avatar radius={"md"} alt={summary.title}>
                    {icons[i]}
                  </Avatar>

                  <div>
                    <Text size="xs" fw={700} c="dimmed" tt={"uppercase"}>
                      {summary.title}
                    </Text>
                    <Text size="lg">
                      {formatNumber(summary.count)} - {formatCurrency(summary.amount)}
                    </Text>
                  </div>
                </Group>
              </Paper>
            )
        )}
      </SimpleGrid>
    );
  }
};

export default OrdersSummaryByOrderPaymentType;
