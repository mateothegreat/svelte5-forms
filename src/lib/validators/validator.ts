/**
 * The result of a validation.
 */
export interface ValidationResult {
  /**
   * Whether the validation is valid.
   */
  valid: boolean;

  /**
   * The validation messages.
   */
  message?: string | string[];
}

/**
 * A validator function.
 */
export interface Validator<T> {
  /**
   * The name of the validator.
   */
  name: string;

  /**
   * The validation function.
   * @param {T} value The value to validate.
   * @returns {ValidationResult} The validation result.
   */
  fn: (value: T) => string[];
}
