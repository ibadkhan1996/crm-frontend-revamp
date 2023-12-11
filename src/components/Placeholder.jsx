import { Paper, Text } from "@mantine/core";

const Placeholder = ({ title = "", icon }) => {
  return (
    <Paper p={"md"} withBorder ta={"center"} c={"dimmed"}>
      {icon}

      <Text size="xl">{title}</Text>
    </Paper>
  );
};

export default Placeholder;
