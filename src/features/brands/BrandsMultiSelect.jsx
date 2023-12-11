import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllBrandsQuery } from "src/api/brand";
import MultiSelect from "src/components/MultiSelect";

const BrandsMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const brands = useGetAllBrandsQuery(queryObject);

  if (brands.isFetching) return <Skeleton height={36} />;

  if (brands.isSuccess) return <MultiSelect data={brands.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default BrandsMultiSelect;
