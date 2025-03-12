import type { Validator } from "./validator";

/**
 * Checks for a valid email address.
 * @returns {Validator<string>} The validator function.
 */
export const email = (): Validator<string> => {
  return {
    name: "email",
    fn: (value: string) => {
      if (!value || !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return {
          valid: false,
          message: "must be a valid email address"
        };
      }
      return { valid: true };
    }
  };
};
