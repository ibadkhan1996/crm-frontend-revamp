import { Loader, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllRolesQuery } from "src/api/role";
import Placeholder from "src/components/Placeholder";
import AddRoleModalButton from "./AddRoleModalButton";
import RolesList from "./RolesList";

const Roles = () => {
  const roles = useGetAllRolesQuery();

  if (roles.isLoading) return <Loader />;

  if (roles.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (roles.isSuccess && !roles.data?.length) return <Placeholder title={"No roles to display"} icon={<IconFiles size={50} />} />;

  return (
    <Stack gap={"xl"}>
      <AddRoleModalButton />

      <RolesList roles={roles.data} />
    </Stack>
  );
};

export default Roles;
