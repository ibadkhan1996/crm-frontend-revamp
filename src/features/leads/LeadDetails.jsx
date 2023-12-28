import { Avatar, Badge, Divider, Flex, Grid, Group, Loader, Paper, Progress, Stack, Tabs, Text, Tooltip } from "@mantine/core";
import { IconAt, IconBolt, IconBrandCitymapper, IconMapPin, IconNote, IconPhone, IconUser, IconUserDollar, IconX, IconZoomMoney } from "@tabler/icons-react";
import { truncate } from "lodash";
import { useParams } from "react-router-dom";
import { useGetLeadByIdQuery } from "src/api/lead";
import Placeholder from "src/components/Placeholder";
import { MANTINE_VARIANTS } from "src/constants/CLASS_NAMES";
import { SERVER_URL } from "src/constants/SERVER_URL";
import CommentBox from "src/features/comments/CommentBox";
import classes from "src/index.module.css";
import capitalizeLetters from "src/utils/capitalizeLetters";
import formatDate from "src/utils/formatDate";
import formatNumber from "src/utils/formatNumber";
import formatPhone from "src/utils/formatPhone";
import getAbbreviation from "src/utils/getAbbreviation";
import DeleteLeadButton from "./DeleteLeadButton";
import EditLeadButton from "./EditLeadButton";

const LeadDetails = () => {
  const { id } = useParams();

  const lead = useGetLeadByIdQuery(id);

  if (lead.isLoading) return <Loader />;

  if (lead.isError) return <Placeholder title={lead.error?.response?.data.message || "Error"} icon={<IconX size={50} />} />;

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 4, xl: 3 }}>
        <Stack>
          <Group>
            <Avatar alt={lead.data.title} radius={"md"} size={"xl"}>
              {getAbbreviation(lead.data.title)}
            </Avatar>

            <Stack gap={4}>
              <Group gap={"xs"}>
                <Tooltip label={capitalizeLetters(lead.data.title)} withArrow>
                  <Text size="lg" fw={700} tt={"capitalize"}>
                    {truncate(lead.data.title, { length: 15 })}
                  </Text>
                </Tooltip>

                <EditLeadButton lead={lead.data} />

                <DeleteLeadButton leadId={lead.data._id} redirect />
              </Group>

              <Text size="xs" fw={500} mt={6}>
                <Text component="span" c={"dimmed"}>
                  Lead ID:
                </Text>
                {` ${lead.data._id}`}
              </Text>

              <Text size="xs" fw={500}>
                <Text component="span" c={"dimmed"}>
                  Created on:
                </Text>
                {` ${formatDate(lead.data.createdAt)}`}
              </Text>
            </Stack>
          </Group>

          <Paper withBorder p={"md"}>
            <Flex align={"flex-start"} gap={"md"}>
              <IconZoomMoney className={classes.icon} style={{ minWidth: "max-content" }} />

              <Stack gap={4}>
                <Text size="xs" c={"dimmed"} fw={500}>
                  Keywords
                </Text>

                <Group gap={"xs"}>
                  {!!lead.data.keywords.length ? (
                    lead.data.keywords.map((keyword, i) => (
                      <Badge key={i} size="sm">
                        {keyword}
                      </Badge>
                    ))
                  ) : (
                    <Badge size="sm">No keywords</Badge>
                  )}
                </Group>
              </Stack>
            </Flex>
          </Paper>

          <Paper withBorder p={"md"}>
            <Stack>
              <Group>
                <Avatar src={`${SERVER_URL}${lead.data.brand.imgUrl}`} size={24} radius={"md"} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Brand
                  </Text>
                  <Text size="sm" fw={500} tt={"capitalize"}>
                    {lead.data.brand.title}
                  </Text>
                </div>
              </Group>

              <Divider />

              <Group>
                <IconUser className={classes.icon} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    PPC executive
                  </Text>
                  <Text size="sm" fw={500} tt={"capitalize"}>
                    {lead.data.ppcExecutive.name}
                  </Text>
                </div>
              </Group>

              <Divider />

              <Group>
                <IconUserDollar className={classes.icon} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Front seller
                  </Text>
                  <Text size="sm" fw={500} tt={"capitalize"}>
                    {lead.data.frontSeller?.name || "Not assigned yet"}
                  </Text>
                </div>
              </Group>

              <Divider />

              <Group>
                <IconBolt className={classes.icon} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Lead status
                  </Text>
                  <Badge color={MANTINE_VARIANTS[lead.data.leadStatus?.className || "default"]}>{lead.data.leadStatus?.title || "no status assigned yet"}</Badge>
                </div>
              </Group>

              <Divider />

              <Group>
                <IconBrandCitymapper className={classes.icon} />

                <div>
                  <Group gap={"xs"}>
                    <Text size="xs" c={"dimmed"} fw={500}>
                      Lead stage
                    </Text>
                    <Progress h={5} w={100} color={MANTINE_VARIANTS[lead.data.leadStage?.className || "default"]} value={formatNumber(lead.data.leadStage?.percentage || 0)} />
                    <Text size="xs" fw={700}>
                      {`${formatNumber(lead.data.leadStage?.percentage || 0)}%`}
                    </Text>
                  </Group>

                  <Tooltip label={capitalizeLetters(lead.data.leadStage?.title || "no stage assigned yet")} withArrow>
                    <Badge color={MANTINE_VARIANTS[lead.data.leadStage?.className || "default"]}>{truncate(lead.data.leadStage?.title || "no stage assigned yet", { length: 35 })}</Badge>
                  </Tooltip>
                </div>
              </Group>

              <Divider />

              <Group>
                <IconMapPin className={classes.icon} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Lead origin
                  </Text>
                  <Text size="sm" fw={500} tt={"capitalize"}>
                    {`${lead.data?.city ? `${lead.data.city}, ` : ""} ${lead.data.state}, ${lead.data.country} ${lead.data.countryCode}`}
                  </Text>
                </div>
              </Group>

              <Divider />

              <Group>
                <IconAt className={classes.icon} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Lead email
                  </Text>
                  <Text size="sm" fw={500}>
                    {lead.data.email}
                  </Text>
                </div>
              </Group>

              <Divider />

              <Group>
                <IconPhone className={classes.icon} />

                <div>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Lead phone
                  </Text>
                  <Text size="sm" fw={500}>
                    {formatPhone(lead.data.phone)}
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
              {lead.data.notes || "No additional notes"}
            </Text>
          </Paper>

          <Tabs variant="pills" keepMounted={false} defaultValue="comments">
            <Paper withBorder p={6} mb={"md"}>
              <Tabs.List grow>
                <Tabs.Tab value="comments" tt={"capitalize"}>
                  comments
                </Tabs.Tab>
              </Tabs.List>
            </Paper>

            <Tabs.Panel value="comments">
              <CommentBox documentId={id} documentReference="lead" />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default LeadDetails;
