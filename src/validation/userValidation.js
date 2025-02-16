import * as yup from "yup";

export const userRegisterSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

export const userLoginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const resetPasswordSchema = yup.object({
  token: yup.string().required(),
  password: yup.string().required().min(6),
});
