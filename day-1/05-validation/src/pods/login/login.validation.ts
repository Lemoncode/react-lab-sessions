import { ValidationSchema, Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';

const validationSchema: ValidationSchema = {
  field: {
    login: [Validators.required.validator],
    password: [Validators.required.validator],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
