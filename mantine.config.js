import { Avatar, Badge, Drawer, Loader, Modal, Select } from "@mantine/core";

export default {
  colors: { themeColor: ["#e7f1ff", "#cedfff", "#9bbcff", "#6496ff", "#3876fe", "#1c62fe", "#0958ff", "#0049e4", "#0041cc", "#0037b4"] },
  cursorType: "pointer",
  defaultRadius: "md",
  fontFamily: "Inter, sans-serif",
  primaryColor: "indigo",
  components: {
    Avatar: Avatar.extend({ styles: { image: { objectFit: "contain" } } }),
    Badge: Badge.extend({ defaultProps: { variant: "light" } }),
    Drawer: Drawer.extend({ defaultProps: { position: "right", styles: { content: { display: "flex", flexDirection: "column" }, body: { height: "100%" } }, overlayProps: { blur: 2 } } }),
    Loader: Loader.extend({ defaultProps: { type: "bars" } }),
    Modal: Modal.extend({ defaultProps: { centered: true, overlayProps: { blur: 2 } } }),
    Select: Select.extend({ defaultProps: { allowDeselect: false, checkIconPosition: "right" } }),
  },
};
