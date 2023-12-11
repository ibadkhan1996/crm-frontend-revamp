import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllRolesQuery } from "src/api/role";
import Select from "src/components/Select";

const RolesSelect = ({ selectProps = {}, queryObject = {} }) => {
  const roles = useGetAllRolesQuery(queryObject);

  if (roles.isFetching) return <Skeleton height={36} />;

  if (roles.isSuccess) return <Select data={roles.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default RolesSelect;
