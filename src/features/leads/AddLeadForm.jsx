import { Button, Grid, Group, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";
import { City, Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useCreateLeadMutation } from "src/api/lead";
import Select from "src/components/Select";
import TagsInput from "src/components/TagsInput";
import BrandsSelect from "src/features/brands/BrandsSelect";
import LeadStatusSelect from "src/features/leadStatus/LeadStatusSelect";
import FrontSellersSelect from "src/features/users/FrontSellersSelect";
import capitalizeLetters from "src/utils/capitalizeLetters";
import PpcExecutivesSelect from "../users/PpcExecutivesSelect";

const AddLeadForm = () => {
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
      stateCode: "",
      city: "",
      keywords: [],
      notes: "",
      brand: "",
      frontSeller: undefined,
      ppcExecutive: undefined,
      leadStatus: undefined,
      leadStage: undefined,
    },
    transformValues: (values) => ({
      ...values,
      city: values.city || "",
    }),
  });

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(form.values.countryCode);
  const cities = City.getCitiesOfState(form.values.countryCode, form.values.stateCode);

  const handleCountry = (countryCode) => {
    const country = Country.getCountryByCode(countryCode);

    form.setValues({ country: country.name, countryCode: country.isoCode, state: null, stateCode: null, city: null });
  };

  const handleState = (stateCode) => {
    const state = State.getStateByCodeAndCountry(stateCode, form.values.countryCode);

    form.setValues({ state: state.name, stateCode: state.isoCode, city: null });
  };

  const handleSubmit = (values) => {
    createLeadMutation.mutate(values, { onSuccess: ({ data }) => navigate(`/leads/${data._id}`) });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid grow align="flex-end">
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <BrandsSelect selectProps={{ required: true, label: "select brand", ...form.getInputProps("brand") }} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <PpcExecutivesSelect selectProps={{ required: true, label: "select ppc executive", ...form.getInputProps("ppcExecutive") }} queryObject={form.values.brand && { brands: { $in: form.values.brand } }} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <FrontSellersSelect selectProps={{ label: "select front seller", ...form.getInputProps("frontSeller") }} queryObject={form.values.brand && { brands: { $in: form.values.brand } }} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <TextInput required label={capitalizeLetters("name")} {...form.getInputProps("title")} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <TextInput type="email" required label={capitalizeLetters("email")} {...form.getInputProps("email")} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <TextInput type="tel" required label={capitalizeLetters("phone")} {...form.getInputProps("phone")} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Select
            required
            label={capitalizeLetters("select country")}
            data={countries}
            selectLabel="name"
            selectValue="isoCode"
            limit={5}
            searchable
            nothingFoundMessage={upperFirst("no results found")}
            {...form.getInputProps("countryCode")}
            onChange={handleCountry}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Select
            required
            label={capitalizeLetters("select state")}
            data={states}
            selectLabel="name"
            selectValue="isoCode"
            limit={5}
            searchable
            nothingFoundMessage={upperFirst(!form.values.countryCode ? "select country first" : "no results found")}
            {...form.getInputProps("stateCode")}
            onChange={handleState}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Select
            label={capitalizeLetters("select city (optional)")}
            data={cities}
            selectLabel="name"
            selectValue="name"
            limit={5}
            searchable
            nothingFoundMessage={upperFirst(!form.values.stateCode ? "select state first" : "no results found")}
            {...form.getInputProps("city")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <LeadStatusSelect selectProps={{ label: "select lead status", ...form.getInputProps("leadStatus") }} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <TagsInput label={capitalizeLetters("add keywords (optional)")} placeholder={upperFirst("type a keyword and press [ENTER]")} {...form.getInputProps("keywords")} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 12 }}>
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
