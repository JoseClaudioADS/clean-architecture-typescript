import * as yup from "yup";

export default yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  birthday: yup.date().required(),
});
