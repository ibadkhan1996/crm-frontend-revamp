import { Avatar, Group, Popover, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { truncate } from "lodash";
import formatDate from "src/utils/formatDate";
import getAbbreviation from "src/utils/getAbbreviation";

const CommentPopover = ({ comment }) => {
  const [commentPopoverOpened, { open: openCommentPopover, close: closeCommentPopover }] = useDisclosure(false);

  if (typeof comment === "string") return <Text size="sm">{comment}</Text>;

  return (
    <Popover width={250} withArrow shadow="md" opened={commentPopoverOpened}>
      <Popover.Target>
        <Text size="sm" onMouseEnter={openCommentPopover} onMouseLeave={closeCommentPopover}>
          {truncate(comment.comment, { length: 25 })}
        </Text>
      </Popover.Target>

      <Popover.Dropdown>
        <Stack>
          <Text size="sm">{comment.comment}</Text>

          <Group gap={"xs"}>
            <Avatar>{getAbbreviation(comment.user.name)}</Avatar>

            <Stack gap={2}>
              <Text size="sm" fw={500} tt={"capitalize"}>
                {comment.user.name}
              </Text>

              <Text size="xs">{formatDate(comment.createdAt)}</Text>
            </Stack>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

export default CommentPopover;
