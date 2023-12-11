import { Loader, Paper, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllBrandsQuery } from "src/api/brand";
import Placeholder from "src/components/Placeholder";
import AddBrandModalButton from "./AddBrandModalButton";
import BrandsList from "./BrandsList";

const Brands = () => {
  const brands = useGetAllBrandsQuery();

  if (brands.isLoading) return <Loader />;

  if (brands.isError) return <Placeholder title={"Error"} icon={<IconX size={50} />} />;

  if (brands.isSuccess && !brands.data?.length) return <Placeholder title={"No brands to display"} icon={<IconFiles size={50} />} />;

  return (
    <Paper withBorder p={"md"}>
      <Stack gap={"xl"}>
        <AddBrandModalButton />

        <BrandsList brands={brands.data} />
      </Stack>
    </Paper>
  );
};

export default Brands;
