/**
 * A validator function.
 *
 * @category validators
 */
export interface Validator<T> {
  /**
   * The name of the validator.
   */
  name?: string;

  /**
   * The validation function.
   * @param {T} value The value to validate.
   * @returns {ValidationResult} The validation result.
   */
  fn: (value: T) => ValidationResult | ValidationResult[];
}

/**
 * The result of a validation.
 *
 * @category validators
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
