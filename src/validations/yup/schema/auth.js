import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().lowercase().trim().min(2).max(255).required(),
  password: Yup.string().required(),
});
