import dayjs from "dayjs";

const formatDate = (date) => {
  return dayjs(date.split("T")[0]).format("MMM DD, YYYY");
};

export default formatDate;
