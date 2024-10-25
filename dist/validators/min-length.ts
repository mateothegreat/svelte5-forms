import type { Validator } from "./validator";

/**
 * Checks if the value is at least the provided length.
 * @param {number} length The minimum length.
 * @returns {Validator<string>} The validator function.
 */
export const minLength = <T extends string | Array<any>>(length: number): Validator<T> => {
	return {
		name: "minLength",
		fn: (value: T) => {
			if (typeof value === "string") {
				if (value.length < length) {
					return [`must be at least ${length} characters`]
				};
			}

			if (Array.isArray(value)) {
				if (value.length < length) {
					return [`must have at least ${length} items`]
				};
			}
		}
	};
};
