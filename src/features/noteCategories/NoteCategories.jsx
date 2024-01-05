import { ActionIcon, Flex, Grid, Group, Loader, ScrollArea, Stack, Title, Tooltip } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { IconDots, IconFiles, IconX } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import { useGetNoteCategoriesWithPaginationInfiniteQuery } from "src/api/noteCategory";
import Placeholder from "src/components/Placeholder";
import AddNoteCategoryModalButton from "./AddNoteCategoryModalButton";
import NoteCategoryCard from "./NoteCategoryCard";

const NoteCategories = () => {
  const noteCategories = useGetNoteCategoriesWithPaginationInfiniteQuery();
  const fetchMoreNoteCategories = () => noteCategories.fetchNextPage();

  const scrollAreaRef = useRef(null);
  const { ref, entry } = useIntersection({ root: scrollAreaRef.current, threshold: 1 });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchMoreNoteCategories();
    }
  }, [entry?.isIntersecting]);

  useEffect(() => {
    scrollAreaRef.current?.scrollTo({ left: 0 });
  }, [noteCategories.data]);

  return (
    <Grid>
      <Grid.Col span={{ md: 3, lg: 2 }}>
        <AddNoteCategoryModalButton />
      </Grid.Col>

      <Grid.Col span={{ md: 9, lg: 10 }}>
        <Stack>
          <Title order={4}>Note categories</Title>

          {noteCategories.isLoading && <Loader />}

          {noteCategories.isError && <Placeholder title={"Error"} icon={<IconX size={50} />} />}

          {noteCategories.isSuccess && !noteCategories.data.pages[0]?.data.length && <Placeholder title={"No note categories to display"} icon={<IconFiles size={50} />} />}

          {noteCategories.isSuccess && !!noteCategories.data.pages[0]?.data.length && (
            <ScrollArea w={"100%"} viewportRef={scrollAreaRef}>
              <Flex gap={"md"}>
                {noteCategories.data.pages.map((page) => {
                  return page.data.map((noteCategory) => <NoteCategoryCard key={noteCategory._id} noteCategory={noteCategory} />);
                })}

                {noteCategories.hasNextPage && (
                  <Group ref={ref}>
                    <Tooltip label="Load more" position="left" withArrow>
                      <ActionIcon onClick={fetchMoreNoteCategories} loading={noteCategories.isFetchingNextPage}>
                        <IconDots size={18} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                )}
              </Flex>
            </ScrollArea>
          )}
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default NoteCategories;
