import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetClientsByBrandQuery } from "src/api/client";
import Select from "src/components/Select";

const ClientsByBrandSelect = ({ selectProps = {}, brandId = "" }) => {
  const clientsByBrand = useGetClientsByBrandQuery(brandId);

  if (clientsByBrand.isFetching) return <Skeleton height={36} />;

  if (clientsByBrand.isSuccess) return <Select data={clientsByBrand.data} tt="capitalize" selectLabel="title" selectValue="_id" capitalizeLabel={false} searchable nothingFoundMessage={upperFirst("no results found")} {...selectProps} />;
};

export default ClientsByBrandSelect;
