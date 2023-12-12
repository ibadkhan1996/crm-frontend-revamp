import { Avatar, Badge, Group, Table, Text, UnstyledButton, rem } from "@mantine/core";
import { truncate } from "lodash";
import { Link } from "react-router-dom";
import { MANTINE_VARIANTS } from "src/constants/CLASS_NAMES";
import { SERVER_URL } from "src/constants/SERVER_URL";
import CommentPopover from "src/features/comments/CommentPopover";
import formatAmount from "src/utils/formatAmount";
import formatDate from "src/utils/formatDate";
import getAbbreviation from "src/utils/getAbbreviation";
import clientWorthMethods from "src/utils/newClientWorthMethods";
import ClientsTableRowActions from "./ClientsTableRowActions";

const ClientsTableRow = ({ client }) => {
  return (
    <Table.Tr key={client._id}>
      <Table.Td>
        <UnstyledButton component={Link} to={client._id}>
          <Group wrap="nowrap" gap={"xs"} title={client.email}>
            <Avatar alt={client.title}>{getAbbreviation(client.title)}</Avatar>
            <div>
              <Text size="sm" fw={500} tt="capitalize">
                {client.title}
              </Text>
              <Text size="xs" c={"dimmed"}>
                {truncate(client.email, { length: 25 })}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </Table.Td>

      <Table.Td>
        <Group wrap="nowrap" gap={"xs"}>
          <Avatar alt={client.brand.title} src={`${SERVER_URL}${client.brand.imgUrl}`} imageProps={{ style: { objectFit: "contain" } }} p={2} radius="sm" bg={"white"}>
            {getAbbreviation(client.brand.title)}
          </Avatar>
          <Text size="sm" fw={500} tt="capitalize">
            {client.brand.title}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Group wrap="nowrap" gap={"xs"} title={client.user.email}>
          <Avatar alt={client.user.name}>{getAbbreviation(client.user.name)}</Avatar>
          <div>
            <Text size="sm" fw={500} tt="capitalize">
              {client.user.name}
            </Text>
            <Text size="xs" c={"dimmed"}>
              {truncate(client.user.email, { length: 25 })}
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td ta={"center"}>{formatAmount(clientWorthMethods(client).getClientWorth())}</Table.Td>

      <Table.Td ta={"center"}>
        <Badge color={MANTINE_VARIANTS[client.status.className]}>{client.status.title}</Badge>
      </Table.Td>

      <Table.Td ta={"center"}>
        <Badge color={MANTINE_VARIANTS[client.health.className]}>{client.health.title}</Badge>
      </Table.Td>

      <Table.Td>
        <Group wrap="nowrap" gap={"xs"}>
          <img src={`${SERVER_URL}${client.category.imgUrl}`} style={{ width: rem(22) }} />
          <Text size="sm" tt={"capitalize"}>
            {client.category.title}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td ta={"center"}>{formatAmount(clientWorthMethods(client).getClientPartialRefundAmount())}</Table.Td>

      <Table.Td ta={"center"}>{formatAmount(clientWorthMethods(client).getClientPartialChargebackAmount())}</Table.Td>

      <Table.Td ta={"center"}>{client.orders.length}</Table.Td>

      <Table.Td ta={"center"}>
        <CommentPopover comment={client.lastComment} />
      </Table.Td>

      <Table.Td ta={"center"}>{formatDate(client.createdAt)}</Table.Td>

      <Table.Td>
        <ClientsTableRowActions client={client} />
      </Table.Td>
    </Table.Tr>
  );
};

export default ClientsTableRow;
