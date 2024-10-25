
export const FORM_MANAGER_KEY = Symbol("form-manager");

export class Instance<T> {
  controls: Record<string, Control<T>> = {};
  errors?: Record<string, string[]>;

  get values() {
    const result: Record<string, T> = {};
    const keys = Object.keys(this.controls);
    const values = keys.map((key) => this.controls[key].value);
    for (let i = 0; i < keys.length; i++) {
      result[keys[i]] = values[i];
    }
    return result;
  }
}

export let form: Instance<any>;

/**
 * Create a form with an array of controls.
 * @param name - The name of the form.
 * @param controls - An array of controls to be added to the form.
 * @returns Returns a {Form} object.
 */
export const createForm = <T>(name: string, controls: Control<any>[]): Instance<T> => {
  const form = new Instance<T>();

  for (const control of controls) {
    form.controls[control.name] = control;
  }
  return form;
};

