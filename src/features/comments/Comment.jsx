import { Avatar, Flex, Paper, Stack, Text, useComputedColorScheme } from "@mantine/core";
import capitalizeLetters from "src/utils/capitalizeLetters";
import formatDate from "src/utils/formatDate";
import getAbbreviation from "src/utils/getAbbreviation";
import DeleteCommentButton from "./DeleteCommentButton";
import EditCommentModalButton from "./EditCommentModalButton";

const Comment = ({ comment }) => {
  const colorScheme = useComputedColorScheme();

  const flip = false;

  return (
    <Flex gap={"xs"} align="flex-end" wrap={"nowrap"} maw={"50%"} {...(flip && { direction: "row-reverse", ml: "auto" })}>
      <Avatar alt={comment.user.name}>{getAbbreviation(comment.user.name)}</Avatar>

      <Stack gap={4}>
        <Paper p={"xs"} {...(flip ? { bg: "indigo", c: "white" } : { bg: colorScheme === "dark" ? "gray.9" : "gray.1" })}>
          <Text fz={"sm"}>{comment.comment}</Text>
        </Paper>

        <Flex align={"center"} mih={30} {...(flip && { direction: "row-reverse" })}>
          <Text size="xs" c={"dimmed"} mr={"xs"}>
            {capitalizeLetters(comment.user.name)} &#8226; <time dateTime={comment.createdAt}>{formatDate(comment.createdAt)}</time>
          </Text>

          <EditCommentModalButton comment={comment} />

          <DeleteCommentButton commentId={comment._id} />
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Comment;
