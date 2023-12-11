import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllUsersQuery } from "src/api/user";
import MultiSelect from "src/components/MultiSelect";

const UsersMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const users = useGetAllUsersQuery(queryObject);

  if (users.isFetching) return <Skeleton height={36} />;

  if (users.isSuccess) return <MultiSelect data={users.data} tt="capitalize" selectLabel="email" selectValue="_id" capitalizeLabel={false} searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default UsersMultiSelect;
