import { Button, Grid, Group, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";
import { City, Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateLeadMutation } from "src/api/lead";
import Select from "src/components/Select";
import TagsInput from "src/components/TagsInput";
import capitalizeLetters from "src/utils/capitalizeLetters";
import BrandsSelect from "src/features/brands/BrandsSelect";
import LeadStatusSelect from "src/features/leadStatus/LeadStatusSelect";

const AddLeadForm = () => {
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(countryCode);
  const cities = City.getCitiesOfState(countryCode, stateCode);

  const createLeadMutation = useCreateLeadMutation();

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
      email: "",
      phone: "",
      country: "",
      countryCode: "",
      state: "",
      city: "",
      keywords: [],
      notes: "",
      company: "",
      brand: "",
      frontSeller: "",
      user: "",
      leadStatus: "",
      leadStage: "",
    },
  });

  useEffect(() => {
    if (countryCode) {
      form.setFieldValue("countryCode", countryCode);

      const country = Country.getCountryByCode(countryCode);
      form.setFieldValue("country", country.name);
    }

    setStateCode(null);
    form.setFieldValue("city", null);
  }, [countryCode]);

  useEffect(() => {
    if (stateCode) {
      const state = State.getStateByCodeAndCountry(stateCode, countryCode);
      form.setFieldValue("state", state.name);
    }

    form.setFieldValue("city", null);
  }, [stateCode]);

  const handleSubmit = (values) => {
    createLeadMutation.mutate(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid grow align="flex-end">
        <Grid.Col span={4}>
          <BrandsSelect selectProps={{ required: true, label: "select brand", ...form.getInputProps("brand") }} />
        </Grid.Col>
        <Grid.Col span={4}>
          <p>ppc executive select</p>
        </Grid.Col>
        <Grid.Col span={4}>
          <p>front seller select</p>
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput required label={capitalizeLetters("name")} {...form.getInputProps("title")} />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput type="email" required label={capitalizeLetters("email")} {...form.getInputProps("email")} />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput type="tel" required label={capitalizeLetters("client phone")} {...form.getInputProps("phone")} />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            required
            label={capitalizeLetters("select country")}
            data={countries}
            selectLabel="name"
            selectValue="isoCode"
            limit={5}
            searchable
            nothingFoundMessage={upperFirst("no results found")}
            value={countryCode}
            onChange={setCountryCode}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            required
            label={capitalizeLetters("select state")}
            data={states}
            selectLabel="name"
            selectValue="isoCode"
            limit={5}
            searchable
            nothingFoundMessage={upperFirst(!countryCode ? "select country first" : "no results found")}
            value={stateCode}
            onChange={setStateCode}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            label={capitalizeLetters("select city (optional)")}
            data={cities}
            selectLabel="name"
            selectValue="name"
            limit={5}
            searchable
            nothingFoundMessage={upperFirst(!stateCode ? "select state first" : "no results found")}
            {...form.getInputProps("city")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <LeadStatusSelect selectProps={{ required: true, label: "select lead status", ...form.getInputProps("leadStatus") }} />
        </Grid.Col>
        <Grid.Col span={6}>
          <TagsInput label={capitalizeLetters("add keywords (optional)")} placeholder={upperFirst("type a keyword and press [ENTER]")} {...form.getInputProps("keywords")} />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea label={capitalizeLetters("add notes (optional)")} rows={4} {...form.getInputProps("notes")} />
        </Grid.Col>
      </Grid>

      <Group justify="flex-end" mt={"lg"}>
        <Button color="red" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit" loading={createLeadMutation.isPending}>
          Create lead
        </Button>
      </Group>
    </form>
  );
};

export default AddLeadForm;
