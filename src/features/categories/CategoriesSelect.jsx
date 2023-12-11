import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllCategoriesQuery } from "src/api/category";
import Select from "src/components/Select";

const CategoriesSelect = ({ selectProps = {}, queryObject = {} }) => {
  const categories = useGetAllCategoriesQuery(queryObject);

  if (categories.isFetching) return <Skeleton height={36} />;

  if (categories.isSuccess) return <Select data={categories.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default CategoriesSelect;
