import { Avatar, Badge, Group, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import _, { truncate } from "lodash";
import capitalizeLetters from "src/utils/capitalizeLetters";
import getAbbreviation from "src/utils/getAbbreviation";
import EditUserModalButton from "./EditUserModalButton";

const UsersList = ({ users = [] }) => {
  const companyWiseUsers = _.chain(users)
    .groupBy("company.title")
    .map((items, group) => ({ company: group, totalUsers: items.length, users: _.orderBy(items, ["roleAndPermissions.title", "name"]) }))
    .sortBy("company")
    .value();

  return companyWiseUsers.map((item) => (
    <Stack key={item.company} gap={"xs"}>
      <Group>
        <Title order={4}>{capitalizeLetters(item.company)}</Title>
        <Badge>{`total users: ${item.totalUsers}`}</Badge>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
        {item.users.map((user) => {
          return (
            <Paper key={user._id} p={"sm"} withBorder>
              <Group gap={"sm"}>
                <Avatar radius={"md"}>{getAbbreviation(user.name)}</Avatar>

                <div style={{ flex: 1 }}>
                  <Text fw={500} tt={"capitalize"}>
                    {user.name}
                  </Text>
                  <Text size="xs" c={"dimmed"}>
                    {truncate(user.email, 20)}
                  </Text>
                  <Badge size="sm">{user.roleAndPermissions.title}</Badge>
                </div>

                <EditUserModalButton user={user} />
              </Group>
            </Paper>
          );
        })}
      </SimpleGrid>
    </Stack>
  ));
};

export default UsersList;
