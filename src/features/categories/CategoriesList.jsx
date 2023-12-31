import { Avatar, Group, Paper, SimpleGrid, Text, Tooltip } from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";
import { SERVER_URL } from "src/constants/SERVER_URL";
import formatCurrency from "src/utils/formatCurrency";
import getAbbreviation from "src/utils/getAbbreviation";
import EditCategoryModalButton from "./EditCategoryModalButton";

const CategoriesList = ({ categories = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {categories.map((category) => {
        return (
          <Paper key={category._id} p={"sm"} withBorder>
            <Group gap={"sm"}>
              <Avatar radius={"md"} src={`${SERVER_URL}${category.imgUrl}`} alt={category.title}>
                {getAbbreviation(category.title)}
              </Avatar>

              <div style={{ flex: 1 }}>
                <Text fw={500} tt={"capitalize"}>
                  {category.title}
                </Text>

                <Group gap={8}>
                  <Text size="xs" c={"dimmed"}>
                    {`${formatCurrency(category.minValue)} - ${formatCurrency(category.maxValue)}`}
                  </Text>

                  {category.isDefault && (
                    <Tooltip label="Default client category" withArrow>
                      <IconChecks size={18} />
                    </Tooltip>
                  )}
                </Group>
              </div>

              <EditCategoryModalButton category={category} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default CategoriesList;
