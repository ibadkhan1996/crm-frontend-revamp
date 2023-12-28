import { Avatar, Badge, Divider, Flex, Grid, Group, Loader, Paper, Progress, Stack, Text, Tooltip } from "@mantine/core";
import { IconBrandCitymapper, IconCoin, IconCreditCard, IconCurrencyDollar, IconUser, IconUserDollar, IconVersions, IconX } from "@tabler/icons-react";
import { truncate } from "lodash";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "src/api/order";
import Placeholder from "src/components/Placeholder";
import { MANTINE_VARIANTS } from "src/constants/CLASS_NAMES";
import { SERVER_URL } from "src/constants/SERVER_URL";
import classes from "src/index.module.css";
import capitalizeLetters from "src/utils/capitalizeLetters";
import formatAmount from "src/utils/formatAmount";
import formatDate from "src/utils/formatDate";
import formatNumber from "src/utils/formatNumber";
import getAbbreviation from "src/utils/getAbbreviation";
import DeleteOrderButton from "./DeleteOrderButton";
import EditOrderButton from "./EditOrderButton";

const OrderDetails = () => {
  const { id } = useParams();

  const order = useGetOrderByIdQuery(id);

  if (order.isLoading) return <Loader />;

  if (order.isError) return <Placeholder title={order.error?.response?.data.message || "Error"} icon={<IconX size={50} />} />;

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 4, xl: 3 }}>
        <Stack>
          <Group>
            <Avatar alt={order.data.client.title} radius={"md"} size={"xl"}>
              {getAbbreviation(order.data.client.title)}
            </Avatar>

            <Stack gap={4}>
              <Group gap={"xs"}>
                <Tooltip label={capitalizeLetters(order.data.client.title)} withArrow>
                  <Text size="lg" fw={700} tt={"capitalize"}>
                    {truncate(order.data.client.title, { length: 18 })}
                  </Text>
                </Tooltip>

                <EditOrderButton order={order.data} />

                <DeleteOrderButton orderId={order.data._id} redirect />
              </Group>

              <Text size="xs" fw={500} mt={6}>
                <Text component="span" c={"dimmed"}>
                  Order ID:
                </Text>
                {` ${order.data._id}`}
              </Text>

              <Text size="xs" fw={500}>
                <Text component="span" c={"dimmed"}>
                  Created on:
                </Text>
                {` ${formatDate(order.data.createdAt)}`}
              </Text>
            </Stack>
          </Group>

          <Paper withBorder p={"md"}>
            <Flex align={"flex-start"} gap={"md"}>
              <IconVersions className={classes.icon} style={{ minWidth: "max-content" }} />

              <Stack gap={4}>
                <Text size="xs" c={"dimmed"} fw={500}>
                  Services
                </Text>

                <Group gap={"xs"}>
                  {!!order.data.services.length ? (
                    order.data.services.map((service, i) => (
                      <Badge key={i} size="sm">
                        {service}
                      </Badge>
                    ))
                  ) : (
                    <Badge key={i} size="sm">
                      No services
                    </Badge>
                  )}
                </Group>
              </Stack>
            </Flex>
          </Paper>

          <Paper withBorder p={"md"}>
            <Stack>
              <Group>
                <Avatar src={`${SERVER_URL}${order.data.brand.imgUrl}`} size={24} radius={"md"} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500} radius={"md"}>
                    Brand
                  </Text>
                  <Text size="sm" fw={500} tt={"capitalize"}>
                    {order.data.brand.title}
                  </Text>
                </div>
              </Group>

              <Divider />

              <Group>
                <IconUser className={classes.icon} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Account manager
                  </Text>
                  {order.data.user ? (
                    <Text size="sm" fw={500} tt={"capitalize"}>
                      {order.data.user.name}
                    </Text>
                  ) : (
                    <Badge color="gray">no manager assigned</Badge>
                  )}
                </div>
              </Group>

              <Divider />

              <Group>
                <IconUserDollar className={classes.icon} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Sales person email
                  </Text>
                  <Text size="sm" fw={500}>
                    {order.data.salesEmail}
                  </Text>
                </div>
              </Group>

              <Divider />

              <Group>
                <IconCoin className={classes.icon} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Order amount
                  </Text>
                  <Text size="sm" fw={500}>
                    {formatAmount(order.data.amount)}
                  </Text>
                </div>
              </Group>

              <Divider />

              <Group>
                <IconCurrencyDollar className={classes.icon} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Payment type
                  </Text>
                  <Text size="sm" fw={500} tt={"capitalize"}>
                    {order.data.paymentType}
                  </Text>
                </div>
              </Group>

              <Divider />

              <Group>
                <IconCreditCard className={classes.icon} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Payment gateway
                  </Text>
                  <Text size="sm" fw={500} tt={"capitalize"}>
                    {order.data.paymentGateway.title}
                  </Text>
                </div>
              </Group>

              <Divider />

              <Group>
                <Avatar src={`${SERVER_URL}${order.data.orderType.imgUrl}`} size={24} radius={"md"} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Order type
                  </Text>
                  <Text size="sm" fw={500} tt={"capitalize"}>
                    {order.data.orderType.title}
                  </Text>
                </div>
              </Group>

              <Divider />

              <Group>
                <IconBrandCitymapper className={classes.icon} />

                <div>
                  <Group gap={"xs"}>
                    <Text size="xs" c={"dimmed"} fw={500}>
                      Order stage
                    </Text>
                    <Progress h={5} w={100} color={MANTINE_VARIANTS[order.data.orderStage?.className || "default"]} value={formatNumber(order.data.orderStage?.percentage || 0)} />
                    <Text size="xs" fw={700}>
                      {`${formatNumber(order.data.orderStage?.percentage || 0)}%`}
                    </Text>
                  </Group>

                  <Tooltip label={capitalizeLetters(order.data.orderStage?.title || "no stage assigned yet")} withArrow>
                    <Badge color={MANTINE_VARIANTS[order.data.orderStage?.className || "default"]}>{truncate(order.data.orderStage?.title || "no stage assigned yet", { length: 35 })}</Badge>
                  </Tooltip>
                </div>
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default OrderDetails;
