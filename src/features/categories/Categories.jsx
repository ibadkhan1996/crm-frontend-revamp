import { Loader, Paper, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllCategoriesQuery } from "src/api/category";
import Placeholder from "src/components/Placeholder";
import AddCategoryModalButton from "./AddCategoryModalButton";
import CategoriesList from "./CategoriesList";

const Categories = () => {
  const categories = useGetAllCategoriesQuery();

  if (categories.isLoading) return <Loader />;

  if (categories.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (categories.isSuccess && !categories.data?.length) return <Placeholder title={"No categories to display"} icon={<IconFiles size={50} />} />;

  return (
    <Paper withBorder p={"md"}>
      <Stack gap={"xl"}>
        <AddCategoryModalButton />

        <CategoriesList categories={categories.data} />
      </Stack>
    </Paper>
  );
};

export default Categories;
