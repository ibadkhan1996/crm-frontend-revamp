import { Avatar, Badge, Group, Table, Text, Tooltip, UnstyledButton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { truncate } from "lodash";
import { Link } from "react-router-dom";
import { MANTINE_VARIANTS } from "src/constants/CLASS_NAMES";
import { SERVER_URL } from "src/constants/SERVER_URL";
import CommentPopover from "src/features/comments/CommentPopover";
import formatDate from "src/utils/formatDate";
import getAbbreviation from "src/utils/getAbbreviation";
import LeadsTableRowActions from "./LeadsTableRowActions";

const LeadsTableRow = ({ lead }) => {
  return (
    <Table.Tr key={lead._id}>
      <Table.Td>
        <UnstyledButton component={Link} to={lead._id}>
          <Group wrap="nowrap" gap={"xs"} title={lead.email}>
            <Avatar alt={lead.title}>{getAbbreviation(lead.title)}</Avatar>
            <div>
              <Text size="sm" fw={500} tt="capitalize">
                {lead.title}
              </Text>
              <Text size="xs" c={"dimmed"}>
                {truncate(lead.email, { length: 25 })}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </Table.Td>

      <Table.Td>
        <Group wrap="nowrap" gap={"xs"}>
          <Avatar alt={lead.brand.title} src={`${SERVER_URL}${lead.brand.imgUrl}`} imageProps={{ style: { objectFit: "contain" } }} p={2} radius="sm" bg={"white"}>
            {getAbbreviation(lead.brand.title)}
          </Avatar>
          <Text size="sm" fw={500} tt="capitalize">
            {lead.brand.title}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        {lead.ppcExecutive ? (
          <Group wrap="nowrap" gap={"xs"} title={lead.ppcExecutive.email}>
            <Avatar alt={lead.ppcExecutive.name}>{getAbbreviation(lead.ppcExecutive.name)}</Avatar>
            <div>
              <Text size="sm" fw={500} tt="capitalize">
                {lead.ppcExecutive.name}
              </Text>
              <Text size="xs" c={"dimmed"}>
                {truncate(lead.ppcExecutive.email, { length: 25 })}
              </Text>
            </div>
          </Group>
        ) : (
          <Badge color="gray">no ppc executive assigned</Badge>
        )}
      </Table.Td>

      <Table.Td>
        {lead.frontSeller ? (
          <Group wrap="nowrap" gap={"xs"} title={lead.frontSeller.email}>
            <Avatar alt={lead.frontSeller.name}>{getAbbreviation(lead.frontSeller.name)}</Avatar>
            <div>
              <Text size="sm" fw={500} tt="capitalize">
                {lead.frontSeller.name}
              </Text>
              <Text size="xs" c={"dimmed"}>
                {truncate(lead.frontSeller.email, { length: 25 })}
              </Text>
            </div>
          </Group>
        ) : (
          <Badge color="gray">no front seller assigned</Badge>
        )}
      </Table.Td>

      <Table.Td ta={"center"}>
        <Badge color={MANTINE_VARIANTS[lead.leadStatus.className]}>{lead.leadStatus.title}</Badge>
      </Table.Td>

      <Table.Td ta={"center"}>
        <Tooltip label={upperFirst(lead.leadStage?.title || "no stage assigned yet")} withArrow>
          <Badge color={MANTINE_VARIANTS[lead.leadStage?.className || "default"]}>{truncate(lead.leadStage?.title || "no stage assigned yet", { length: 25 })}</Badge>
        </Tooltip>
      </Table.Td>

      <Table.Td ta={"center"}>
        <CommentPopover comment={lead.lastComment} />
      </Table.Td>

      <Table.Td ta={"center"}>{formatDate(lead.createdAt)}</Table.Td>

      <Table.Td>
        <LeadsTableRowActions lead={lead} />
      </Table.Td>
    </Table.Tr>
  );
};

export default LeadsTableRow;
