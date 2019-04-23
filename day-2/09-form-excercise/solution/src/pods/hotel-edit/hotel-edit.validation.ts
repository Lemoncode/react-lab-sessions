import {
  createFormValidation,
  ValidationConstraints,
  Validators
} from "lc-form-validation";

const hotelFormValidationConstraints: ValidationConstraints = {
  fields: {
    name: [{ validator: Validators.required }],
    description: [{ validator: Validators.required }],
    rating:[],
    address: [{ validator: Validators.required }],
    city: [],
  }
};

export const hotelFormValidation = createFormValidation(
  hotelFormValidationConstraints
);
