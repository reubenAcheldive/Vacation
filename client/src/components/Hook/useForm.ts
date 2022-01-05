import { useState } from "react";
import { omit } from "lodash";
import { validatorForm } from "./valaitor";
const { usernameRegex, firstNameRegex, lastNameRegex, passwordRegex } =
  validatorForm();
export type User = {
  userName: string;
  firstName?: string;
  lastName?: string;
  password: string;
};
const user = {
  userName: "",
  firstName: "",
  lastName: "",
  password: "",
};

export const useForm = () => {
  const [errors, setErrors] = useState<Partial<User>>({});
  const [values, setValues] = useState(user);

  const validate = (name: string, value: string) => {
    switch (name) {
      case "userName":
        if (!usernameRegex.test(value) || value.trim().length === 0) {
          setErrors({
            ...errors,
            userName: "userName must contain only Letters ",
          });
        } else {
          let newObj = omit(errors, "userName");
          setErrors(newObj);
        }
        break;

      case "firstName":
        if (!firstNameRegex.test(value) || value.trim().length === 0) {
          setErrors({
            ...errors,
            firstName: "firstName must contain only Letters ",
          });
        } else {
          let newObj = omit(errors, "firstName");
          setErrors(newObj);
        }

        break;
      case "lastName":
        if (name === "lastName") {
          if (!lastNameRegex.test(value) || value.trim().length === 0) {
            setErrors({
              ...errors,
              lastName: "firstName must contain only Letters ",
            });
          } else {
            let newObj = omit(errors, "lastName");
            setErrors(newObj);
          }
        }
        break;
      case "password":
        if (!passwordRegex.test(value) || value.trim().length === 0) {
          setErrors({
            ...errors,
            password: "password must have 8 digits ",
          });
        } else {
          let newObj = omit(errors, "password");
          setErrors(newObj);
        }
        break;
      default:
        break;
    }
  };
  const handelChange = (event: any): any => {
    const { name, value } = event.target;
    validate(name, value);
    setValues({ ...values, [name]: value });
  };

  return { errors, values, handelChange };
};
