import * as yup from "yup";

let passwordRegex =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=?])[a-zA-Z0-9!@#$%^&*-_=?]{8,}/g;

export const emailValidation = yup.object().shape({
  email: yup.string().email().required("Please enter your email"),
});
export const passwordValidation = yup.object().shape({
  newPassword: yup
    .string()
    .min(8)
    .matches(passwordRegex, { message: "Please enter a strong password" })
    .required("Please enter the password"),
});
export const adminLoginValidation = yup.object().shape({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

export const contactFormValidation = yup.object().shape({
  from_name: yup.string().min(2).required("Please enter your full name"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Number must be of 10 digit")
    .max(10, "Number must be of 10 digit")
    .required("Please enter your mobile number"),
  user_email: yup.string().email().required("Please enter your email"),
  message: yup.string().min(2).required("Please enter your message"),
});

export const projectFormValidation = yup.object().shape({
  title: yup.string().min(2).required("Please enter project title"),
  githubLink: yup.string().required("Please enter project github link"),
  description: yup.string().min(2).required("Please enter project description"),
  feature_project: yup
    .string()
    .required("Please select Whether it is feature project or not"),
});
