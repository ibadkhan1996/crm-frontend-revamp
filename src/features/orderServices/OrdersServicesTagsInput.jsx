import { Skeleton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllActiveOrderServicesQuery } from "src/api/orderService";
import TagsInput from "src/components/TagsInput";

const OrderServicesTagsInput = ({ tagsInputProps = {}, queryObject = {} }) => {
  const orderServices = useGetAllActiveOrderServicesQuery(queryObject);

  if (orderServices.isFetching) return <Skeleton height={36} />;

  if (orderServices.isSuccess) return <TagsInput data={orderServices.data} tt="capitalize" selectLabel="title" placeholder={upperFirst("select from options or type your own")} {...tagsInputProps} />;
};

export default OrderServicesTagsInput;
