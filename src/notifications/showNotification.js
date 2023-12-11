import { notifications } from "@mantine/notifications";
import classes from "./notification.module.css";

export const showNotificaton = ({ title = "", message = "", type = "" }) => {
  return notifications.show({
    title,
    message,
    // ...(type && { classNames: classes }),
    ...(type && { color: type === "success" ? "teal" : "red" }),
  });
};
