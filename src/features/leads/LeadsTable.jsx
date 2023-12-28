import { Group, Loader, Pagination, Select, Stack, Table, Text } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useGetLeadsWithPaginationQuery } from "src/api/lead";
import Placeholder from "src/components/Placeholder";
import LeadsTableRow from "./LeadsTableRow";

const LeadsTable = ({ query }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState("10");

  const leads = useGetLeadsWithPaginationQuery({ page, pageSize, query });

  useEffect(() => {
    setPage(1);
  }, [pageSize, query]);

  if (leads.isLoading) return <Loader />;

  if (leads.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (leads.isSuccess && !leads.data.length) return <Placeholder title={"No leads to display"} icon={<IconFiles size={50} />} />;

  if (leads.isSuccess && !!leads.data.length) {
    return (
      <Stack gap={"lg"}>
        <Table.ScrollContainer {...(leads.data.data.length > 8 && { h: 600 })} minWidth={1900}>
          <Table stickyHeader stickyHeaderOffset={-1} verticalSpacing="sm" withTableBorder>
            <Table.Thead>
              <Table.Tr tt="capitalize">
                <Table.Th>lead</Table.Th>
                <Table.Th>brand</Table.Th>
                <Table.Th>ppc executive</Table.Th>
                <Table.Th>front seller</Table.Th>
                <Table.Th miw={125} ta={"center"}>
                  lead status
                </Table.Th>
                <Table.Th miw={125} ta={"center"}>
                  lead stage
                </Table.Th>
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
              {leads.data.data.map((lead) => (
                <LeadsTableRow key={lead._id} lead={lead} />
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>

        <Group gap={8} justify="flex-end">
          <Text size="sm">Per page:</Text>
          <Select data={["10", "20", "30", "50"]} value={pageSize} onChange={setPageSize} w={75} checkIconPosition="right" />
          <Pagination total={Math.ceil(leads.data.length / pageSize)} value={page} onChange={setPage} ml={"md"} />
        </Group>
      </Stack>
    );
  }
};

export default LeadsTable;
