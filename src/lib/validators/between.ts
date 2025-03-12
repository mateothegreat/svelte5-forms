import type { ValidationResult, Validator } from "./validator";

/**
 * Checks if the value is equal to the provided value.
 * @param {any} v Value to compare to.
 * @returns {Validator<string>} The validator function.
 */
export const between = (min: number, max: number): Validator<number> => {
  return {
    fn: (value: number): ValidationResult => {
      if (value < min || value > max) {
        return {
          valid: false,
          message: `value ${value} must be between ${min} and ${max}`
        };
      }
      return {
        valid: true,
        message: ""
      };
    }
  };
};
