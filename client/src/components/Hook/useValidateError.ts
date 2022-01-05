import { omit } from "lodash";
import { useState } from "react";


export interface TextField {
  destination: string;
  description: string;
  img: string;
}
export const useValidateError = () => {
  const [errors, setErrors] = useState<Partial<TextField>>({});

  
  const imgRegex = /https?:\/\/.*\.(?:png|jpg|img)/;
  const onlyLettersRegex =
    /^[A-Za-z \p{Han}\p{Katakana}\p{Hiragana}\p{Hangul}-]*$/;
  const validate = (name: string, value: string) => {

   
    switch (name) {
      case "destination":
        if ( !onlyLettersRegex.test(value) ||value.trim().length === 0) {
          setErrors({
            ...errors,
            destination: "destination must Private ",
          });
        } else {
          let newObj = omit(errors, "destination");
          setErrors(newObj);
        }
        break;

      case "description":
        if (value.trim().length === 0|| !onlyLettersRegex.test(value)) {
          setErrors({
            ...errors,
            description: "description must Private ",
          });
        } else {
          let newObj = omit(errors, "description");
          setErrors(newObj);
        }

        break;
      case "img":
        if (!imgRegex.test(value)) {
          setErrors({
            ...errors,
            img: "url img must contains  .png .jpg .img",
          });
        } else {
          let newObj = omit(errors, "img");
          setErrors(newObj);
        }

        break;

      default:
        break;
    }
    return;
  };

  return { validate, errors };
};
