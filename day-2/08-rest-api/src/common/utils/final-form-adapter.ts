import { ValidationResult, FormValidationResult } from "@lemoncode/fonk";

// TODO: in future releases we will create
// a separate microlibrary called: fonk-final-form
// will include a createValidationFinalForm, that will
// implement a ValidationForm class including the
// final form expected behavior.
// TODO export FormValidation in fonk.d.ts
// import {FormValidation} from '@lemoncode/fonk'
// formValidation : FormValidation
// Add error handling
export const validateField = (
  formValidation,
  fieldId: string,
  value: any,
  values?: any
): Promise<ValidationResult> => {
  return new Promise<ValidationResult>(resolve => {
    formValidation.validateField(fieldId, value, values).then(result => {
      if (!result || result.succeeded === true) {
        resolve(null);
      } else {
        resolve(result);
      }
    });
  });
};

export const validateForm = (
  formValidation,
  values
): Promise<FormValidationResult> =>
  formValidation
    .validateForm(values)
    .then(({ succeeded, fieldErrors }) => (succeeded ? null : fieldErrors));
