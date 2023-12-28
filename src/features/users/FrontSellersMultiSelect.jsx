import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetFrontSellersQuery } from "src/api/user";
import MultiSelect from "src/components/MultiSelect";

const FrontSellersMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const frontSellers = useGetFrontSellersQuery(queryObject);

  if (frontSellers.isFetching) return <Skeleton height={36} />;

  if (frontSellers.isSuccess) return <MultiSelect data={frontSellers.data} tt="capitalize" selectLabel="email" selectValue="_id" capitalizeLabel={false} searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default FrontSellersMultiSelect;
