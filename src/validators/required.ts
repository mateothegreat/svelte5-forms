import type { Validator } from "./validator";

/**
 * Checks if the value is not empty, undefined, or otherwise falsy.
 *
 * This validator ensures that:
 * - Strings are not empty or only whitespace.
 * - Arrays have at least one element.
 * - Objects are not null or undefined.
 *
 * @category validators
 */
export const required = <T>(): Validator<T> => {
  return {
    name: "required",
    fn: (value: T) => {
      // Handle undefined and null:
      if (value === undefined || value === null) {
        return {
          valid: false,
          message: "This field is required"
        };
      }

      // Handle strings (check for empty or whitespace-only):
      if (typeof value === "string" && value.trim() === "") {
        return {
          valid: false,
          message: "This field is required"
        };
      }

      // Falsy values:
      if (value === false || value === 0 || value === "") {
        return {
          valid: false,
          message: "This field is required"
        };
      }

      // Handle arrays (check for empty arrays):
      if (Array.isArray(value) && value.length === 0) {
        return {
          valid: false,
          message: "This field is required"
        };
      }

      return { valid: true };
    }
  };
};
