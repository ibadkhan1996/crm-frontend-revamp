import { Badge, Group, Paper, Text, ThemeIcon, Title, Tooltip } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { IconFolderFilled } from "@tabler/icons-react";
import { truncate } from "lodash";
import DeleteNoteCategoryButton from "./DeleteNoteCategoryButton";
import EditNoteCategoryModalButton from "./EditNoteCategoryModalButton";

const NoteCategoryCard = ({ noteCategory }) => {
  return (
    <Paper p={"md"} bg={noteCategory.color} miw={{ sm: "33%", lg: "25%" }}>
      <Group mb={"lg"} justify="space-between">
        <ThemeIcon {...(noteCategory.color && { color: "dark" })} variant="light" size={"xl"}>
          {noteCategory.icon ? <Text size="xl">{noteCategory.icon}</Text> : <IconFolderFilled size={"85%"} />}
        </ThemeIcon>

        <Group gap={0}>
          <EditNoteCategoryModalButton noteCategory={noteCategory} {...(noteCategory.color && { actionIconProps: { color: "dark" } })} />

          <DeleteNoteCategoryButton noteCategoryId={noteCategory._id} {...(noteCategory.color && { actionIconProps: { color: "dark" } })} />
        </Group>
      </Group>

      {noteCategory.title.length > 25 ? (
        <Tooltip label={upperFirst(noteCategory.title)} withArrow>
          <Title order={5} {...(noteCategory.color && { c: "dark" })}>
            {truncate(upperFirst(noteCategory.title), { length: 25 })}
          </Title>
        </Tooltip>
      ) : (
        <Title order={5} {...(noteCategory.color && { c: "dark" })}>
          {upperFirst(noteCategory.title)}
        </Title>
      )}

      <Badge {...(noteCategory.color && { color: "dark" })} variant="light">
        {noteCategory.notes} notes
      </Badge>
    </Paper>
  );
};

export default NoteCategoryCard;
