import type { Validator } from "./validator";

/**
 * Checks if the value is at least the provided length.
 * @param {number} length The minimum length.
 * @returns {Validator<string>} The validator function.
 */
export const required = <T extends string | Array<any>>(): Validator<T> => {
	return {
		name: "required",
		fn: (value: T) => {
			return value ? [] : ["required"];
		}
	};
};
