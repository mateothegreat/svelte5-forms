import type { Validator } from "./validators/validator";

export class FormInstance<T = any> {
  controls: Record<string, Control<T>> = {};
  errors?: Record<string, string[]>;

  get values(): Record<string, any> {
    const result: Record<string, any> = {} as T;
    const keys = Object.keys(this.controls);
    const values = keys.map((key) => this.controls[key].value);
    for (let i = 0; i < keys.length; i++) {
      result[keys[i]] = values[i];
    }
    return result;
  }

  get valid(): boolean {
    const keys = Object.keys(this.controls);
    return keys.every((key) => this.controls[key].valid);
  }
}

/**
 * A control object.
 */
export class Control<V> {
  name: string;
  value?: V = $state();
  data?: any[];
  displayFn?: (item: any) => string;
  disabled?: boolean;
  max?: number;
  validators?: Validator<V>[];
  errors?: Record<string, string[]> = $state({});
  valid?: boolean = $state(true);
}

/**
 * Create a form with an array of controls.
 * @param name - The name of the form.
 * @param controls - An array of controls to be added to the form.
 * @returns Returns a {Form} object.
 */
// export const createForm = <T>(controls: Control<T>[]): FormInstance<T> => {
//   const form = new FormInstance<T>();
//   for (const control of controls) {
//     form.controls[control.name] = createControl(control);
//   }
//   return form;
// };

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
