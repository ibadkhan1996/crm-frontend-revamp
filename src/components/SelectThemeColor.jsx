import { Badge, ColorPicker, DEFAULT_THEME, Group, Paper, Stack, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

const SelectThemeColor = () => {
  const [color, setColor] = useLocalStorage({ key: "mantine-theme-color", defaultValue: "indigo" });

  const handleChange = (color) => {
    const colorName = Object.keys(DEFAULT_THEME.colors).find((key) => DEFAULT_THEME.colors[key].includes(color));

    setColor(colorName);
  };

  const colorPickerSwatches = Object.keys(DEFAULT_THEME.colors)
    .map((key) => !["dark", "gray"].includes(key) && DEFAULT_THEME.colors[key].at(7))
    .filter(Boolean);

  return (
    <Paper p={"sm"} w={"max-content"} withBorder>
      <Stack gap={4}>
        <Group gap={"xs"}>
          <Text size="xs" fw={700}>
            Selected theme:
          </Text>

          <Badge variant="filled" size="sm" color={color}>
            {color}
          </Badge>
        </Group>

        <ColorPicker withPicker={false} swatches={colorPickerSwatches} swatchesPerRow={6} onChange={handleChange} />
      </Stack>
    </Paper>
  );
};

export default SelectThemeColor;
