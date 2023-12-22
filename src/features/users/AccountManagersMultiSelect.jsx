import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAccountManagersQuery } from "src/api/user";
import MultiSelect from "src/components/MultiSelect";

const AccountManagersMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const accountManagers = useGetAccountManagersQuery(queryObject);

  if (accountManagers.isFetching) return <Skeleton height={36} />;

  if (accountManagers.isSuccess) return <MultiSelect data={accountManagers.data} tt="capitalize" selectLabel="email" selectValue="_id" capitalizeLabel={false} searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default AccountManagersMultiSelect;
