import type { Validator } from "./validator";
/**
 * Checks if the value is at least the provided length.
 * @param {number} length The minimum length.
 * @returns {Validator<string>} The validator function.
 */
export declare const minLength: <T extends string | Array<any>>(length: number) => Validator<T>;
