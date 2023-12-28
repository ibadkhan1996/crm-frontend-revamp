import { ActionIcon, Avatar, Badge, Button, Divider, Grid, Group, Loader, Paper, Popover, Stack, Tabs, Text, Tooltip } from "@mantine/core";
import { IconActivityHeartbeat, IconArrowNarrowDown, IconArrowNarrowUp, IconAt, IconBolt, IconInfoCircle, IconNote, IconPhone, IconPlus, IconUser, IconX } from "@tabler/icons-react";
import { truncate } from "lodash";
import { Link, useParams } from "react-router-dom";
import { useGetClientByIdQuery } from "src/api/client";
import Placeholder from "src/components/Placeholder";
import { MANTINE_VARIANTS } from "src/constants/CLASS_NAMES";
import { SERVER_URL } from "src/constants/SERVER_URL";
import CommentBox from "src/features/comments/CommentBox";
import OrdersTable from "src/features/orders/OrdersTable";
import classes from "src/index.module.css";
import capitalizeLetters from "src/utils/capitalizeLetters";
import formatAmount from "src/utils/formatAmount";
import formatDate from "src/utils/formatDate";
import formatPhone from "src/utils/formatPhone";
import getAbbreviation from "src/utils/getAbbreviation";
import clientWorthMethods from "src/utils/newClientWorthMethods";
import DeleteClientButton from "./DeleteClientButton";
import EditClientButton from "./EditClientButton";

const addIcon = <IconPlus size={18} />;

const ClientWorth = ({ client }) => {
  if (client) {
    return (
      <Paper withBorder p={"md"}>
        <Stack>
          <div>
            <Group gap={4}>
              <Text size="xs" c={"dimmed"} fw={500}>
                Client's worth overview
              </Text>

              <Popover width={175} position="bottom-start" withArrow shadow="md">
                <Popover.Target>
                  <ActionIcon size={"sm"} variant="transparent" color="yellow" title="Client's worth breakdown">
                    <IconInfoCircle />
                  </ActionIcon>
                </Popover.Target>

                <Popover.Dropdown p={"xs"}>
                  <Stack gap={"sm"}>
                    <Group justify="space-between">
                      <Text size="xs" c={"dimmed"} fw={500}>
                        New order
                      </Text>

                      <Text size="xs" fw={500}>
                        {formatAmount(clientWorthMethods(client).getNewOrderAmount())}
                      </Text>
                    </Group>

                    <Group justify="space-between">
                      <Text size="xs" c={"dimmed"} fw={500}>
                        Upsells
                      </Text>

                      <Text size="xs" fw={500}>
                        {formatAmount(clientWorthMethods(client).getUpsellAmount())}
                      </Text>
                    </Group>

                    <Group justify="space-between">
                      <Text size="xs" c={"dimmed"} fw={500}>
                        Partial R/CBs
                      </Text>

                      <Text size="xs" fw={500}>
                        {formatAmount(clientWorthMethods(client).getPartialChargebackAndPartialRefundAmount())}
                      </Text>
                    </Group>

                    <Group justify="space-between">
                      <Text size="xs" c={"dimmed"} fw={500}>
                        Refund/CBs
                      </Text>

                      <Text size="xs" fw={500}>
                        {formatAmount(clientWorthMethods(client).getChargebackAndRefundAmount())}
                      </Text>
                    </Group>

                    <Group justify="space-between">
                      <Text size="xs" c={"dimmed"} fw={500}>
                        Repaids
                      </Text>

                      <Text size="xs" fw={500}>
                        {formatAmount(clientWorthMethods(client).getRepaidAmount())}
                      </Text>
                    </Group>
                  </Stack>
                </Popover.Dropdown>
              </Popover>
            </Group>

            <Text fw={500}>{formatAmount(clientWorthMethods(client).getClientWorth())}</Text>
          </div>

          <Group grow>
            <Group gap={"sm"}>
              <Avatar radius={"md"} color="teal">
                <IconArrowNarrowUp size={18} />
              </Avatar>

              <div>
                <Text size="xs" c={"dimmed"} fw={500}>
                  Received
                </Text>
                <Text size="sm" fw={500} tt={"capitalize"}>
                  {formatAmount(clientWorthMethods(client).getNewOrderAndUpSellAmount() + clientWorthMethods(client).getRepaidAmount())}
                </Text>
              </div>
            </Group>

            <Group gap={"sm"}>
              <Avatar radius={"md"} color="red">
                <IconArrowNarrowDown size={18} />
              </Avatar>

              <div>
                <Text size="xs" c={"dimmed"} fw={500}>
                  Lost
                </Text>
                <Text size="sm" fw={500} tt={"capitalize"}>
                  {formatAmount(clientWorthMethods(client).getChargebackAndRefundAmount() + clientWorthMethods(client).getPartialChargebackAndPartialRefundAmount())}
                </Text>
              </div>
            </Group>
          </Group>
        </Stack>
      </Paper>
    );
  }
};

const ClientDetails = () => {
  const { id } = useParams();

  const canCreateOrder = true;

  const client = useGetClientByIdQuery(id);

  if (client.isLoading) return <Loader />;

  if (client.isError) return <Placeholder title={client.error?.response?.data.message || "Error"} icon={<IconX size={50} />} />;

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 4, xl: 3 }}>
        <Stack>
          <Group>
            <Avatar alt={client.data.title} radius={"md"} size={"xl"}>
              {getAbbreviation(client.data.title)}
            </Avatar>

            <Stack gap={4}>
              <Group gap={"xs"}>
                <Tooltip label={capitalizeLetters(client.data.title)} withArrow>
                  <Text size="lg" fw={700} tt={"capitalize"}>
                    {truncate(client.data.title, { length: 15 })}
                  </Text>
                </Tooltip>

                <EditClientButton client={client.data} />

                <DeleteClientButton clientId={client.data._id} redirect />
              </Group>

              <Text size="xs" fw={500} mt={6}>
                <Text component="span" c={"dimmed"}>
                  Client ID:
                </Text>
                {` ${client.data._id}`}
              </Text>

              <Text size="xs" fw={500}>
                <Text component="span" c={"dimmed"}>
                  Created on:
                </Text>
                {` ${formatDate(client.data.createdAt)}`}
              </Text>
            </Stack>
          </Group>

          <ClientWorth client={client.data} />

          <Paper withBorder p={"md"}>
            <Stack>
              <Group>
                <Avatar src={`${SERVER_URL}${client.data.brand.imgUrl}`} size={24} radius={"md"} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Brand
                  </Text>
                  <Text size="sm" fw={500} tt={"capitalize"}>
                    {client.data.brand.title}
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
                  {client.data.user ? (
                    <Text size="sm" fw={500} tt={"capitalize"}>
                      {client.data.user.name}
                    </Text>
                  ) : (
                    <Badge color="gray">no manager assigned</Badge>
                  )}
                </div>
              </Group>

              <Divider />

              <Group>
                <Avatar src={`${SERVER_URL}${client.data.category.imgUrl}`} size={24} radius={"md"} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Category
                  </Text>
                  <Text size="sm" fw={500} tt={"capitalize"}>
                    {client.data.category.title}
                  </Text>
                </div>
              </Group>

              <Divider />

              <Group>
                <IconBolt className={classes.icon} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Client status
                  </Text>
                  <Badge color={MANTINE_VARIANTS[client.data.status.className]}>{client.data.status.title}</Badge>
                </div>
              </Group>

              <Divider />

              <Group>
                <IconActivityHeartbeat className={classes.icon} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Client health
                  </Text>
                  <Badge color={MANTINE_VARIANTS[client.data.health.className]}>{client.data.health.title}</Badge>
                </div>
              </Group>

              <Divider />

              <Group>
                <IconAt className={classes.icon} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Client email
                  </Text>
                  <Text size="sm" fw={500}>
                    {client.data.email}
                  </Text>
                </div>
              </Group>

              <Divider />

              <Group>
                <IconPhone className={classes.icon} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Client phone
                  </Text>
                  <Text size="sm" fw={500}>
                    {formatPhone(client.data.phone)}
                  </Text>
                </div>
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 8, xl: 9 }}>
        <Stack>
          <Paper withBorder p={"md"}>
            <Group gap={8} align="flex-end" mb={"xs"}>
              <IconNote className={classes.icon} />

              <Text size="xs" c={"dimmed"} fw={500}>
                Notes
              </Text>
            </Group>

            <Text size="sm" fw={500} tt={"capitalize"} style={{ wordBreak: "break-all" }}>
              {client.data.notes || "No additional notes"}
            </Text>
          </Paper>

          <Tabs variant="pills" keepMounted={false} defaultValue="orders">
            <Paper withBorder p={6} mb={"md"}>
              <Tabs.List grow>
                <Tabs.Tab value="orders" tt={"capitalize"}>
                  orders
                </Tabs.Tab>

                <Tabs.Tab value="comments" tt={"capitalize"}>
                  comments
                </Tabs.Tab>
              </Tabs.List>
            </Paper>

            <Tabs.Panel value="orders">
              <Stack>
                {canCreateOrder && (
                  <Button component={Link} to={"/orders/new"} state={{ brand: client.data.brand._id, client: client.data._id }} rightSection={addIcon} ml={"auto"}>
                    Add order
                  </Button>
                )}

                <OrdersTable query={{ client: id }} />
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="comments">
              <CommentBox documentId={id} documentReference="client" />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default ClientDetails;
