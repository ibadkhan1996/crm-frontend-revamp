import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllBrandsQuery } from "src/api/brand";
import Select from "src/components/Select";

const BrandsSelect = ({ selectProps = {}, queryObject = {} }) => {
  const brands = useGetAllBrandsQuery(queryObject);

  if (brands.isFetching) return <Skeleton height={36} />;

  if (brands.isSuccess) return <Select data={brands.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default BrandsSelect;
