import { Button, Group, Loader, Paper, ScrollArea, Stack } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { IconMessages, IconX } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import { useGetCommentsWithPaginationInfiniteQuery } from "src/api/comment";
import Placeholder from "src/components/Placeholder";
import AddCommentForm from "./AddCommentForm";
import Comment from "./Comment";

const CommentBox = ({ documentId, documentReference }) => {
  const comments = useGetCommentsWithPaginationInfiniteQuery({ query: { documentId } });
  const fetchMoreComments = () => comments.fetchNextPage();

  const scrollAreaRef = useRef(null);
  const { ref, entry } = useIntersection({ root: scrollAreaRef.current, threshold: 1 });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchMoreComments();
    }
  }, [entry?.isIntersecting]);

  useEffect(() => {
    scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current?.scrollHeight });
  }, [comments.data]);

  return (
    <Paper p={"md"} withBorder>
      {comments.isLoading && <Loader />}

      {comments.isError && <Placeholder title={"Error"} icon={<IconX size={50} />} />}

      {comments.isSuccess && !comments.data.pages[0]?.data.length && <Placeholder title={"No comments to show"} icon={<IconMessages size={50} />} />}

      {comments.isSuccess && !!comments.data.pages[0]?.data.length && (
        <ScrollArea h={450} viewportRef={scrollAreaRef}>
          {comments.hasNextPage && (
            <Group justify="center" ref={ref}>
              <Button size="xs" onClick={fetchMoreComments} loading={comments.isFetchingNextPage}>
                Load more
              </Button>
            </Group>
          )}

          <Stack>
            {comments.data.pages
              .map((page) => {
                return page.data.map((comment) => <Comment key={comment._id} comment={comment} />);
              })
              .reverse()}
          </Stack>
        </ScrollArea>
      )}

      <AddCommentForm documentId={documentId} documentReference={documentReference} />
    </Paper>
  );
};

export default CommentBox;
