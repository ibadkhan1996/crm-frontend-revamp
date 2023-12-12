import { Group, Loader, Pagination, Select, Stack, Table, Text } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useGetOrdersWithPaginationQuery } from "src/api/order";
import Placeholder from "src/components/Placeholder";
import OrdersTableRow from "./OrdersTableRow";

const OrdersTable = ({ query }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const orders = useGetOrdersWithPaginationQuery({ page, pageSize, query });

  useEffect(() => {
    setPage(1);
  }, [pageSize, query]);

  if (orders.isLoading) return <Loader />;

  if (orders.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (orders.isSuccess && !orders.data.length) return <Placeholder title={"No orders to display"} icon={<IconFiles size={50} />} />;

  if (orders.isSuccess && !!orders.data.length) {
    return (
      <Stack gap={"lg"}>
        <Table.ScrollContainer h={600} minWidth={2350}>
          <Table verticalSpacing="sm" withTableBorder>
            <Table.Thead style={{ position: "sticky", top: -1, backgroundColor: "var(--mantine-color-body)", zIndex: 2 }}>
              <Table.Tr tt="capitalize">
                <Table.Th>order ID</Table.Th>
                <Table.Th>client</Table.Th>
                <Table.Th>brand</Table.Th>
                <Table.Th>account manager</Table.Th>
                <Table.Th ta={"center"}>payment type</Table.Th>
                <Table.Th ta={"center"}>order amount</Table.Th>
                <Table.Th ta={"center"}>order type</Table.Th>
                <Table.Th ta={"center"}>order stage</Table.Th>
                <Table.Th ta={"center"}>order progress</Table.Th>
                <Table.Th ta={"center"}>services</Table.Th>
                <Table.Th ta={"center"}>created on</Table.Th>
                <Table.Th ta={"center"}>actions</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {orders.data.data.map((order) => (
                <OrdersTableRow key={order._id} order={order} />
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>

        <Group gap={8} justify="flex-end">
          <Text size="sm">Per page:</Text>
          <Select data={[10, 20, 30, 50]} value={pageSize} onChange={setPageSize} w={75} checkIconPosition="right" />
          <Pagination total={Math.ceil(orders.data.length / pageSize)} value={page} onChange={setPage} ml={"md"} />
        </Group>
      </Stack>
    );
  }
};

export default OrdersTable;
