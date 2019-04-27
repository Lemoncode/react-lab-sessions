import {
  createFormValidation,
  ValidationConstraints,
  Validators
} from "lc-form-validation";

import { numberValueIsGreaterThan } from "common/validators";

const hotelFormValidationConstraints: ValidationConstraints = {
  fields: {
    name: [{ validator: Validators.required }],
    description: [{ validator: Validators.required }],
    rating: [
      {
        validator: numberValueIsGreaterThan,
        customParams: { maxValue: 3 }
      }
    ],
    address: [{ validator: Validators.required }],
    city: []
  }
};

export const hotelFormValidation = createFormValidation(
  hotelFormValidationConstraints
);
