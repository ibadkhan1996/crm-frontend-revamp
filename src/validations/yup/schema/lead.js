import * as Yup from "yup";

export const createLeadSchema = Yup.object().shape({
  title: Yup.string().lowercase().trim().min(2).max(255).required(),
  email: Yup.string().email().lowercase().trim().min(2).max(255).required(),
  phone: Yup.string().trim().min(10).max(255).required(),
  country: Yup.string().lowercase().trim().min(2).max(255).required(),
  countryCode: Yup.string().uppercase().trim().min(2).max(255).required(),
  state: Yup.string().lowercase().trim().min(2).max(255).required(),
  city: Yup.string().lowercase().trim().min(2).max(255).optional(),
  keywords: Yup.array().of(Yup.string().lowercase().trim()).optional(),
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
  frontSeller: Yup.string()
    .matches(/^[0-9a-fA-F]{24}$/)
    .required(),
  leadStatus: Yup.string()
    .matches(/^[0-9a-fA-F]{24}$/)
    .optional(),
  leadStage: Yup.string()
    .matches(/^[0-9a-fA-F]{24}$/)
    .optional(),
  createdAt: Yup.date().optional(),
});
