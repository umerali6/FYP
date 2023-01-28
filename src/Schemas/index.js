import * as yup from "yup";
// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const basicSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Please Enter your Email"),

  // username: yup.string().username("Please enter a full name").required(" Required"),

  // firstName: yup.string()
  //    .min(2, 'Too Short!')
  //    .max(50, 'Too Long!')
  //    .required('Required'),
  
  password: yup.string().min(6).required("Password is Required"),

  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm Password"),
});
