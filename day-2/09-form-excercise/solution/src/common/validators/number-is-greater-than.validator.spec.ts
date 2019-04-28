import { numberValueIsGreaterThan } from "./number-is-greater-than.validator";

// TODO: Add more unit tests here, e.g.: value equals param, no value informed (null, undefined),
// no param informed. e.g. how to handle strings (== comparison, e.g. a textfield will return
// a string value)...
describe("number-is-greater-than-validator", () => {
  it("should return false when value is lower than param number", () => {
    // Arrange
    const value = 3;
    const maxNumber = 5;
    const viewModel = { mynumber: 2 };

    // Act
    const result = numberValueIsGreaterThan(value, viewModel, {
      maxValue: maxNumber
    });

    // Assert
    expect(result.succeeded).toBeFalsy();
  });

  it("should return true when value is greater than param number", () => {
    // Arrange
    const value = 7;
    const maxNumber = 5;
    const viewModel = { mynumber: 2 };

    // Act
    const result = numberValueIsGreaterThan(value, viewModel, {
      maxValue: maxNumber
    });

    // Assert
    expect(result.succeeded).toBeTruthy();
  });
});
