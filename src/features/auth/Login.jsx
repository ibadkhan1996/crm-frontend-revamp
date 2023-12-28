import { Button, Grid, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { useFocusTrap } from "@mantine/hooks";
import { IconAt, IconKey } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "src/api/auth";
import { showNotificaton } from "src/notifications/showNotification";
// import { useLoginMutation } from "src/redux/api/auth";
import { setCredentials } from "src/redux/slice/authSlice";
import { loginSchema } from "src/validations/yup/schema/auth";

const atIcon = <IconAt size={18} />;
const keyIcon = <IconKey size={18} />;

const Login = () => {
  const focusTrapRef = useFocusTrap(true);

  const dispatch = useDispatch();
  // const [login, { isLoading }] = useLoginMutation();
  const loginMutation = useLoginMutation();

  const navigate = useNavigate();

  const form = useForm({
    validate: yupResolver(loginSchema),
    initialValues: { email: "", password: "" },
  });

  const handleSubmit = (values) => {
    loginMutation.mutate(values, {
      onSuccess: ({ data }) => {
        dispatch(setCredentials(data));
        navigate("/clients", { replace: true });
        // navigate("/admin-settings/companies", { replace: true });
      },
    });
  };

  // const handleSubmit = async (values) => {
  //   try {
  //     const { accessToken } = await login(values).unwrap();

  //     dispatch(setCredentials({ accessToken }));

  //     navigate("/clients", { replace: true });
  //     // navigate("/admin-settings/companies", { replace: true });

  //     showNotificaton({ title: upperFirst("successfully logged in!"), type: "success" });
  //   } catch (error) {
  //     showNotificaton({ title: upperFirst(error.data?.message || "error"), type: "error" });
  //   }
  // };

  return (
    <Grid gutter={0}>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <Paper style={{ display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "center" }} p={"lg"} radius={0}>
          <Stack gap={4} mb={"lg"}>
            <Title size={24}>Hi, Welcome to CRM Utility!</Title>

            <Text fw={500} c={"dimmed"}>
              Please sign-in to your account
            </Text>
          </Stack>

          <form onSubmit={form.onSubmit(handleSubmit)} ref={focusTrapRef}>
            <Stack>
              <TextInput required type="email" label="email address" placeholder="johndoe@example.com" tt={"capitalize"} leftSection={atIcon} leftSectionPointerEvents="none" {...form.getInputProps("email")} />

              <PasswordInput required label="password" placeholder="your password" tt={"capitalize"} leftSection={keyIcon} leftSectionPointerEvents="none" {...form.getInputProps("password")} />

              <Button type="submit" mt={"md"} loading={loginMutation.isPending}>
                Login
              </Button>
            </Stack>
          </form>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};

export default Login;
