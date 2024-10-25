import type { Validator } from "./validator";
/**
 * Checks if the value is equal to the provided value.
 * @param {any} v Value to compare to.
 * @returns {Validator<string>} The validator function.
 */
export declare const mustEqual: (v: any) => Validator<string>;
