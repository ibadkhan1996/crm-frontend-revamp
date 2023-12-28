import { Button, Drawer, Flex, Modal, Stack, TagsInput, TextInput, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useUpdateLeadMutation } from "src/api/lead";
import LeadStagesSelect from "src/features/leadStages/LeadStagesSelect";
import LeadStatusSelect from "src/features/leadStatus/LeadStatusSelect";
import FrontSellersSelect from "src/features/users/FrontSellersSelect";
import PpcExecutivesSelect from "src/features/users/PpcExecutivesSelect";
import capitalizeLetters from "src/utils/capitalizeLetters";

const EditLead = ({ isOpen = false, onClose = () => {}, compact = false, lead }) => {
  const updateLeadMutation = useUpdateLeadMutation();

  const form = useForm({ initialValues: { title: "", email: "", phone: "", notes: "", keywords: [], frontSeller: "", ppcExecutive: "", leadStatus: "", leadStage: "", createdAt: "" } });

  useEffect(() => {
    form.setValues({
      title: lead.title,
      email: lead.email,
      phone: lead.phone,
      notes: lead.notes,
      keywords: lead.keywords,
      frontSeller: lead.frontSeller?._id,
      ppcExecutive: lead.ppcExecutive?._id,
      leadStatus: lead.leadStatus?._id,
      leadStage: lead.leadStage?._id,
      createdAt: new Date(lead.createdAt.split("T")[0]),
    });
  }, [lead]);

  const handlePhoneChange = (e) => form.setFieldValue("phone", e.target.value.replace(/[^0-9/]/g, ""));

  const handleSubmit = (values) => {
    const payload = { ...values, createdAt: dayjs(values.createdAt).format("YYYY-MM-DD") };

    updateLeadMutation.mutate({ leadId: lead._id, payload }, { onSuccess: onClose });
  };

  const compactFields = () => {
    return (
      <>
        <FrontSellersSelect selectProps={{ label: "front seller", ...form.getInputProps("frontSeller") }} queryObject={{ brands: { $in: lead.brand._id } }} />
        <LeadStatusSelect selectProps={{ label: "lead status", ...form.getInputProps("leadStatus") }} />
        <LeadStagesSelect selectProps={{ label: "lead stage", ...form.getInputProps("leadStage") }} />
      </>
    );
  };

  return compact ? (
    <Modal title={"update lead"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {compactFields()}

          <Button type="submit" mt="md" loading={updateLeadMutation.isPending}>
            Update lead
          </Button>
        </Stack>
      </form>
    </Modal>
  ) : (
    <Drawer title={"update lead"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Flex component="form" direction={"column"} h={"100%"} onSubmit={form.onSubmit(handleSubmit)}>
        <Stack style={{ flex: 1 }}>
          <TextInput label={capitalizeLetters("name")} {...form.getInputProps("title")} />
          <TextInput label={capitalizeLetters("email")} {...form.getInputProps("email")} />
          <TextInput type="tel" label={capitalizeLetters("phone")} {...form.getInputProps("phone")} onChange={handlePhoneChange} />
          <PpcExecutivesSelect selectProps={{ label: "ppc executive", ...form.getInputProps("ppcExecutive") }} queryObject={{ brands: { $in: lead.brand._id } }} />
          {compactFields()}
          <TagsInput label={capitalizeLetters("keywords")} placeholder={"Type a keyword and press [ENTER]"} {...form.getInputProps("keywords")} />
          <Textarea rows={4} label={capitalizeLetters("notes")} {...form.getInputProps("notes")} />
          <DateInput label={capitalizeLetters("date")} {...form.getInputProps("createdAt")} />

          <div style={{ position: "sticky", bottom: 16, marginTop: "auto", backgroundColor: "var(--mantine-color-body)", boxShadow: "0 16px 0 0 var(--mantine-color-body)", zIndex: 2 }}>
            <Button fullWidth type="submit" mt="lg" loading={updateLeadMutation.isPending}>
              Update lead
            </Button>
          </div>
        </Stack>
      </Flex>
    </Drawer>
  );
};

export default EditLead;
