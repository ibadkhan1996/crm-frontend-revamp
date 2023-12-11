import { Avatar, Badge, Group, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import _ from "lodash";
import { SERVER_URL } from "src/constants/SERVER_URL";
import capitalizeLetters from "src/utils/capitalizeLetters";
import EditBrandModalButton from "./EditBrandModalButton";

const BrandsList = ({ brands = [] }) => {
  const companyWiseBrands = _.chain(brands)
    .groupBy("company.title")
    .map((items, group) => ({ company: group, totalBrands: items.length, brands: items }))
    .sortBy("company")
    .value();

  return companyWiseBrands.map((item) => (
    <Stack key={item.company} gap={"xs"}>
      <Group>
        <Title order={4}>{capitalizeLetters(item.company)}</Title>
        <Badge>{`total brands: ${item.totalBrands}`}</Badge>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
        {item.brands.map((brand) => (
          <Paper key={brand._id} p={"sm"} withBorder>
            <Group gap={"sm"}>
              <Avatar radius={"md"} src={`${SERVER_URL}${brand.imgUrl}`} alt={brand.title}>
                {brand.acronym}
              </Avatar>

              <div style={{ flex: 1 }}>
                <Text fw={500} tt={"capitalize"}>
                  {brand.title}
                </Text>
                <Text size="xs" c={"dimmed"} tt={"capitalize"}>
                  {`${brand.acronym} - ${brand.company.title}`}
                </Text>
              </div>

              <EditBrandModalButton brand={brand} />
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
    </Stack>
  ));
};

export default BrandsList;
