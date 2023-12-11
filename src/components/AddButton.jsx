import { Avatar, Button, Group, Text, rem } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

const AddButton = ({ title = "", subtitle = "", ...props }) => {
  return (
    <Button variant="default" h={"auto"} p={"sm"} pr={"xl"} {...props}>
      <Group gap={"sm"}>
        <Avatar radius={"md"}>
          <IconPlus style={{ width: rem(16), height: rem(16) }} />
        </Avatar>

        <div>
          <Text fw={500} tt={"capitalize"}>
            {title}
          </Text>
          <Text size="xs" c={"dimmed"} ta={"left"}>
            {upperFirst(subtitle)}
          </Text>
        </div>
      </Group>
    </Button>
  );
};

export default AddButton;
