import type { Validator } from "./validator";
/**
 * Checks if the value is no more than the provided length.
 * @param {number} length The maximum length.
 * @returns {Validator<string>} The validator function.
 */
export declare const maxLength: (length: number) => Validator<string>;
