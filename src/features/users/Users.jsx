import { Loader, Paper, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllUsersQuery } from "src/api/user";
import Placeholder from "src/components/Placeholder";
import AddUserModalButton from "./AddUserModalButton";
import UsersList from "./UsersList";

const Users = () => {
  const users = useGetAllUsersQuery();

  if (users.isLoading) return <Loader />;

  if (users.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (users.isSuccess && !users.data?.length) return <Placeholder title={"No users to display"} icon={<IconFiles size={50} />} />;

  return (
    <Paper withBorder p={"md"}>
      <Stack gap={"xl"}>
        <AddUserModalButton />

        <UsersList users={users.data} />
      </Stack>
    </Paper>
  );
};

export default Users;
