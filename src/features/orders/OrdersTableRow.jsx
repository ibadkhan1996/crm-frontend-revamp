import { Avatar, Badge, Group, Progress, Stack, Table, Text, Tooltip } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { truncate } from "lodash";
import { Link } from "react-router-dom";
import { MANTINE_VARIANTS } from "src/constants/CLASS_NAMES";
import { SERVER_URL } from "src/constants/SERVER_URL";
import formatAmount from "src/utils/formatAmount";
import formatDate from "src/utils/formatDate";
import formatNumber from "src/utils/formatNumber";
import getAbbreviation from "src/utils/getAbbreviation";
import OrderServicesPopover from "../orderServices/OrderServicesPopover";
import OrdersTableRowActions from "./OrdersTableRowActions";

const OrdersTableRow = ({ order }) => {
  return (
    <Table.Tr key={order._id}>
      <Table.Td>
        <Link to={`/orders/${order._id}`}>
          <Badge>{order._id}</Badge>
        </Link>
      </Table.Td>

      <Table.Td>
        <Group wrap="nowrap" gap={"xs"} title={order.client.email}>
          <Avatar alt={order.client.title}>{getAbbreviation(order.client.title)}</Avatar>
          <div>
            <Text size="sm" fw={500} tt="capitalize">
              {order.client.title}
            </Text>
            <Text size="xs" c={"dimmed"}>
              {truncate(order.client.email, { length: 25 })}
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Group wrap="nowrap" gap={"xs"}>
          <Avatar alt={order.brand.title} src={`${SERVER_URL}${order.brand.imgUrl}`} imageProps={{ style: { objectFit: "contain" } }} p={2} radius="sm" bg={"white"}>
            {getAbbreviation(order.brand.title)}
          </Avatar>
          <Text size="sm" fw={500} tt="capitalize">
            {order.brand.title}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        {order.user ? (
          <Group wrap="nowrap" gap={"xs"} title={order.user.email}>
            <Avatar alt={order.user.name}>{getAbbreviation(order.user.name)}</Avatar>
            <div>
              <Text size="sm" fw={500} tt="capitalize">
                {order.user.name}
              </Text>
              <Text size="xs" c={"dimmed"}>
                {truncate(order.user.email, { length: 25 })}
              </Text>
            </div>
          </Group>
        ) : (
          <Badge color="gray">no manager assigned</Badge>
        )}
      </Table.Td>

      <Table.Td ta={"center"} tt={"capitalize"}>
        {order.paymentType}
      </Table.Td>

      <Table.Td ta={"center"}>{formatAmount(order.amount)}</Table.Td>

      <Table.Td ta={"center"} tt={"capitalize"}>
        {order.orderType.title}
      </Table.Td>

      <Table.Td ta={"center"}>
        <Tooltip label={upperFirst(order.orderStage?.title || "no stage assigned yet")} withArrow>
          <Badge color={MANTINE_VARIANTS[order.orderStage?.className || "default"]}>{truncate(order.orderStage?.title || "no stage assigned yet", { length: 25 })}</Badge>
        </Tooltip>
      </Table.Td>

      <Table.Td>
        <Stack align="center" gap={0}>
          <Text fw={700} size="xs" ta={"center"}>{`${formatNumber(order.orderStage?.percentage || 0)}%`}</Text>
          <Progress h={5} w={100} color={MANTINE_VARIANTS[order.orderStage?.className || "default"]} value={formatNumber(order.orderStage?.percentage || 0)} />
        </Stack>
      </Table.Td>

      <Table.Td ta={"center"}>
        <OrderServicesPopover services={order.services} />
      </Table.Td>

      <Table.Td ta={"center"}>{formatDate(order.createdAt)}</Table.Td>

      <Table.Td>
        <OrdersTableRowActions order={order} />
      </Table.Td>
    </Table.Tr>
  );
};

export default OrdersTableRow;
