import { Avatar, Badge, Loader, Modal, Select } from "@mantine/core";

export default {
  colors: { themeColor: ["#e7f1ff", "#cedfff", "#9bbcff", "#6496ff", "#3876fe", "#1c62fe", "#0958ff", "#0049e4", "#0041cc", "#0037b4"] },
  cursorType: "pointer",
  defaultRadius: "md",
  fontFamily: "Inter, sans-serif",
  primaryColor: "indigo",
  components: {
    Avatar: Avatar.extend({ styles: { image: { objectFit: "contain" } } }),
    Modal: Modal.extend({ defaultProps: { overlayProps: { blur: 2 } } }),
    Badge: Badge.extend({ defaultProps: { variant: "light" } }),
    Loader: Loader.extend({ defaultProps: { type: "bars" } }),
    Select: Select.extend({ defaultProps: { allowDeselect: false } }),
  },
};
