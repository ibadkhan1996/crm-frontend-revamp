import { Avatar, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { SERVER_URL } from "src/constants/SERVER_URL";
import getAbbreviation from "src/utils/getAbbreviation";
import EditOrderTypeModalButton from "./EditOrderTypeModalButton";

const OrderTypesList = ({ orderTypes = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {orderTypes.map((orderType) => {
        return (
          <Paper key={orderType._id} p={"sm"} withBorder>
            <Group gap={"sm"}>
              <Avatar radius={"md"} src={`${SERVER_URL}${orderType.imgUrl}`} alt={orderType.title}>
                {getAbbreviation(orderType.title)}
              </Avatar>

              <div style={{ flex: 1 }}>
                <Text fw={500} tt={"capitalize"}>
                  {orderType.title}
                </Text>
              </div>

              <EditOrderTypeModalButton orderType={orderType} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default OrderTypesList;
