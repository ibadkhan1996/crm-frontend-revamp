import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAccountManagersQuery } from "src/api/user";
import Select from "src/components/Select";

const AccountManagersSelect = ({ selectProps = {}, queryObject = {} }) => {
  const accountManagers = useGetAccountManagersQuery(queryObject);

  if (accountManagers.isFetching) return <Skeleton height={36} />;

  if (accountManagers.isSuccess) return <Select data={accountManagers.data} tt="capitalize" selectLabel="email" selectValue="_id" capitalizeLabel={false} searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default AccountManagersSelect;
