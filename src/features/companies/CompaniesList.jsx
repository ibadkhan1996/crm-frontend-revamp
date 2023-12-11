import { Avatar, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { SERVER_URL } from "src/constants/SERVER_URL";
import EditCompanyModalButton from "./EditCompanyModalButton";

const CompaniesList = ({ companies = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {companies.map((company) => {
        return (
          <Paper key={company._id} p={"sm"} withBorder>
            <Group gap={"xs"}>
              <Avatar radius={"md"} src={`${SERVER_URL}${company.imgUrl}`} alt={company.title}>
                {company.acronym}
              </Avatar>

              <div style={{ flex: 1 }}>
                <Text fw={500} tt={"capitalize"}>
                  {company.title}
                </Text>
                <Text size="xs" c={"dimmed"}>
                  {company.acronym}
                </Text>
              </div>

              <EditCompanyModalButton company={company} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default CompaniesList;
