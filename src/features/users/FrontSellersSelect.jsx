import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetFrontSellersQuery } from "src/api/user";
import Select from "src/components/Select";

const FrontSellersSelect = ({ selectProps = {}, queryObject = {} }) => {
  const frontSellers = useGetFrontSellersQuery(queryObject);

  if (frontSellers.isFetching) return <Skeleton height={36} />;

  if (frontSellers.isSuccess) return <Select data={frontSellers.data} tt="capitalize" selectLabel="email" selectValue="_id" capitalizeLabel={false} searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default FrontSellersSelect;
