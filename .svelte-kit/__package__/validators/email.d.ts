import type { Validator } from "./validator";
/**
 * Checks for a valid email address.
 * @returns {Validator<string>} The validator function.
 */
export declare const email: () => Validator<string>;
