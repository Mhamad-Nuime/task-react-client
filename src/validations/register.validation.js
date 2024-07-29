import * as Yup from "yup";

export default function registerSchema(){
  return Yup.object().shape({
    firstName: Yup.string().min(2, 'First Name Too Short').max(10, "First Name Too Long").required("First Name Required"),
    lastName: Yup.string().min(2, 'Last Name  Too Short').max(10, "Last Name  Too Long").required("Last Name Required"),
    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string().min(2, "Password Too Short").required('Password Required'),
    gender: Yup.string().required('Gender Required'),
    phoneNumber: Yup.string().required('Phone Number Required'),
  });
}