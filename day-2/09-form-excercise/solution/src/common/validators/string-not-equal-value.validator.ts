import { FieldValidationResult } from "lc-form-validation";

interface CustomParams {
  stringToCompare: string;
}

// TODO: handle edge cases (value informed, typeof is string...), proper unit tests
export const stringNotEqualValue = (value, vm, customParams: CustomParams) => {
  const paramsOk = paramsInformed(customParams);
  const isValid = paramsOk && value !== customParams.stringToCompare;
  const validationResult = new FieldValidationResult();

  validationResult.succeeded = isValid;
  validationResult.type = "STRING_NOT_EQUAL_VALUE";
  validationResult.errorMessage = isValid
    ? ""
    : `Please enter a valid selection`;
  return validationResult;
};

const paramsInformed = customParams => {
  let paramsInformed = customParams && customParams.stringToCompare;

  if (!paramsInformed) {
    console.error(`You are using custom validator stringNotEqualValue, but you forgot to 
    inform customParams.stringToCompare entry`);
  }

  return paramsInformed;
};
