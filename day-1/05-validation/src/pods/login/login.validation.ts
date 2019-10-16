import { Validators, createFormValidation } from "@lemoncode/fonk";
import { createFinalFormValidation } from "@lemoncode/fonk-final-form";

const validationSchema = {
  field: {
    login: [Validators.required.validator],
    password: [Validators.required.validator]
  }
};

export const formValidation = createFinalFormValidation(validationSchema);
