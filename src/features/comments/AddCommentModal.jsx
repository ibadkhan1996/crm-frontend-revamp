import { Button, Modal, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCreateCommentMutation } from "src/api/comment";

const AddCommentModal = ({ isOpen = false, onClose = () => {}, documentId, documentReference, user }) => {
  const createCommentMutation = useCreateCommentMutation();

  const form = useForm({ initialValues: { comment: "" } });

  const handleSubmit = (values) => {
    const payload = { ...values, documentId, documentReference, user };

    createCommentMutation.mutate(payload, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal title={"add comment"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Textarea rows={4} data-autofocus placeholder="Type a new comment..." {...form.getInputProps("comment")} />

          <Button type="submit" mt="md" loading={createCommentMutation.isPending}>
            Add comment
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddCommentModal;
