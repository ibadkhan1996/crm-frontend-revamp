import { ActionIcon, Box, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconMessagePlus } from "@tabler/icons-react";
import { useCreateCommentMutation } from "src/api/comment";

const AddCommentForm = ({ documentId, documentReference }) => {
  const canCreateComment = true;

  const createCommentMutation = useCreateCommentMutation();

  const form = useForm({ initialValues: { comment: "" } });

  const handleSubmit = (values) => {
    const payload = { ...values, documentId, documentReference, user: "63bb19a37b1a15b66418cfef" };

    createCommentMutation.mutate(payload, { onSuccess: () => form.reset() });
  };

  if (canCreateComment) {
    return (
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)} style={{ position: "relative" }} mt={"md"}>
        <TextInput placeholder="Type a new comment..." required {...form.getInputProps("comment")} />

        <ActionIcon type="submit" style={{ position: "absolute", top: 4, right: 4 }} loading={createCommentMutation.isPending}>
          <IconMessagePlus size={18} />
        </ActionIcon>
      </Box>
    );
  }
};

export default AddCommentForm;
