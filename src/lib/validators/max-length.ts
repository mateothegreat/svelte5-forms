import type { Validator } from "./validator";

/**
 * Checks if the value is at least the provided length.
 * @param {number} length The minimum length.
 * @returns {Validator<string>} The validator function.
 */
export const maxLength = <T extends string | Array<any>>(length: number): Validator<T> => {
  return {
    name: "maxLength",
    fn: (value: T) => {
      if (typeof value === "string") {
        if (value.length < length) {
          return {
            valid: false,
            message: `must be at most ${length} characters`
          };
        }
      }

      if (Array.isArray(value)) {
        if (value.length < length) {
          return {
            valid: false,
            message: `must have at most ${length} items`
          };
        }
      }

      return { valid: true };
    }
  };
};
