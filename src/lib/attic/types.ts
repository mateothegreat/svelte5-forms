import type { Control } from "./form.svelte";

export const FORM_MANAGER_KEY = Symbol("form-manager");

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

export const createForm = <T>(controls: Control<T>[]): FormInstance<T> => {
  const form = new FormInstance<T>();

  for (const control of controls) {
    form.controls[control.name] = control;
  }
  return form;
};
