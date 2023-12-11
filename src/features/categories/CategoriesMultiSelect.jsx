import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllCategoriesQuery } from "src/api/category";
import MultiSelect from "src/components/MultiSelect";

const CategoriesMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const categories = useGetAllCategoriesQuery(queryObject);

  if (categories.isFetching) return <Skeleton height={36} />;

  if (categories.isSuccess) return <MultiSelect data={categories.data} tt="capitalize" selectLabel="title" selectValue="_id" searchable nothingFoundMessage={upperFirst("no results found")} {...multiSelectProps} />;
};

export default CategoriesMultiSelect;
