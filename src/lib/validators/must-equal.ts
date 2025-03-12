import type { Validator } from "./validator";

/**
 * Checks if the value is equal to the provided value.
 * @param {any} v Value to compare to.
 * @returns {Validator<string>} The validator function.
 */
export const mustEqual = (v: any): Validator<string> => {
  return {
    name: "mustEqual",
    fn: (value: string) => {
      if (!value || value !== v) {
        return {
          valid: false,
          message: `must match ${v}`
        };
      }
      return { valid: true };
    }
  };
};
