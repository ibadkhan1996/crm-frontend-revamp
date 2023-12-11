import { Group, Loader, Pagination, Select, Stack, Table, Text } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useGetClientsWithPaginationQuery } from "src/api/client";
import Placeholder from "src/components/Placeholder";
import ClientsTableRow from "./ClientsTableRow";

const ClientsTable = ({ query }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const clients = useGetClientsWithPaginationQuery({ page, pageSize, query });

  useEffect(() => {
    setPage(1);
  }, [pageSize, query]);

  if (clients.isLoading) return <Loader />;

  if (clients.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (clients.isSuccess && !clients.data.length) return <Placeholder title={"No clients to display"} icon={<IconFiles size={50} />} />;

  if (clients.isSuccess && !!clients.data.length) {
    return (
      <Stack gap={"lg"}>
        <Table.ScrollContainer h={600} minWidth={2350}>
          <Table verticalSpacing="sm" withTableBorder>
            <Table.Thead style={{ position: "sticky", top: -1, backgroundColor: "var(--mantine-color-body)", zIndex: 2 }}>
              <Table.Tr tt="capitalize">
                <Table.Th>client</Table.Th>
                <Table.Th>brand</Table.Th>
                <Table.Th>account manager</Table.Th>
                <Table.Th ta={"center"}>client worth</Table.Th>
                <Table.Th miw={125} ta={"center"}>
                  client status
                </Table.Th>
                <Table.Th miw={125} ta={"center"}>
                  client health
                </Table.Th>
                <Table.Th miw={125} ta={"center"}>
                  client category
                </Table.Th>
                <Table.Th ta={"center"}>partial refunds</Table.Th>
                <Table.Th ta={"center"}>partial chargebacks</Table.Th>
                <Table.Th ta={"center"}>no. of orders</Table.Th>
                <Table.Th miw={150} ta={"center"}>
                  last comment
                </Table.Th>
                <Table.Th miw={125} ta={"center"}>
                  created on
                </Table.Th>
                <Table.Th miw={125} ta={"center"}>
                  actions
                </Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {clients.data.data.map((client) => (
                <ClientsTableRow key={client._id} client={client} />
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>

        <Group gap={8} justify="flex-end">
          <Text size="sm">Per page:</Text>
          <Select data={[10, 20, 30, 50]} value={pageSize} onChange={setPageSize} w={75} checkIconPosition="right" />
          <Pagination total={Math.ceil(clients.data.length / pageSize)} value={page} onChange={setPage} ml={"md"} />
        </Group>
      </Stack>
    );
  }
};

export default ClientsTable;
