import { Instance } from './types';
import type { Validator } from './validators/validator';

/**
 * A control object.
 */
class Control<T> {
  name: string;
  value?: T = $state();
  data?: T[];
  displayFn?: (item: T) => string;
  disabled?: boolean;
  max?: number;
  validators?: Validator<T>[];
  errors?: Record<string, string[]> = $state({});
}
/**
 * Create a form with an array of controls.
 * @param name - The name of the form.
 * @param controls - An array of controls to be added to the form.
 * @returns Returns a {Form} object.
 */
export const createForm = <T>(controls: Control<any>[]): Instance<T> => {
  const form = new Instance<T>();
  for (const control of controls) {
    form.controls[control.name] = createControl(control);
  }
  return form;
};

/**
 * Create a control.
 * @param name - The name of the control.
 * @param value - The value of the control.
 * @param props - The properties of the control.
 * @returns Returns a {Control} object.
 */
export const createControl = <T>(config: Control<T>): Control<T> => {
  const control = new Control<T>();
  Object.assign(control, config);
  return control;
};
