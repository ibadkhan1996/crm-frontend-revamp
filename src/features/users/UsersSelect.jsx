import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllUsersQuery } from "src/api/user";
import Select from "src/components/Select";

const UsersSelect = ({ selectProps = {}, queryObject = {} }) => {
  const users = useGetAllUsersQuery(queryObject);

  if (users.isFetching) return <Skeleton height={36} />;

  if (users.isSuccess) return <Select data={users.data} tt="capitalize" selectLabel="email" selectValue="_id" capitalizeLabel={false} searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default UsersSelect;
