import * as Yup from "yup";

export const createClientSchema = Yup.object().shape({
  title: Yup.string().lowercase().trim().min(2).max(255).required(),
  email: Yup.string().email().lowercase().trim().min(2).max(255).required(),
  password: Yup.string().default("Abcd1234"),
  phone: Yup.string().trim().min(10).max(255).required(),
  notes: Yup.string().trim().optional(),
  company: Yup.string()
    .matches(/^[0-9a-fA-F]{24}$/)
    .required(),
  brand: Yup.string()
    .matches(/^[0-9a-fA-F]{24}$/)
    .required(),
  user: Yup.string()
    .matches(/^[0-9a-fA-F]{24}$/)
    .required(),
  //   lead: Yup.string()
  //     .matches(/^[0-9a-fA-F]{24}$/)
  //     .required(),
  //   frontSeller: Yup.string()
  //     .matches(/^[0-9a-fA-F]{24}$/)
  //     .required(),
  status: Yup.string()
    .matches(/^[0-9a-fA-F]{24}$/)
    .optional(),
  health: Yup.string()
    .matches(/^[0-9a-fA-F]{24}$/)
    .optional(),
  isPending: Yup.boolean().optional(),
  createdAt: Yup.date().optional(),
});
