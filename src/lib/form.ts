import { writable, type Writable } from "svelte/store";
import type { Validator } from "./validators/validator";

export const FORM_MANAGER_KEY = Symbol("form-manager");

export class Form<T> {
  controls: Record<string, Control<T>> = {};
  errors?: Writable<Record<string, string[]>> = writable({});
  values?: Writable<Record<string, T>> = writable({});
  // get values() {
  //   const result: Writable<Record<string, T>> = writable({});
  //   const keys = Object.keys(this.controls);

  //   for (const key of keys) {
  //     result.update((values) => {
  //       values[key] = this.controls[key].value;
  //       return values;
  //     });
  //   }

  //   console.log(result);

  //   return result;
  // }
}

export let form: Form<any>;

/**
 * Create a form with an array of controls.
 * @param name - The name of the form.
 * @param controls - An array of controls to be added to the form.
 * @returns Returns a {Form} object.
 */
export const createForm = <T>(name: string, controls: Control<any>[]): Form<T> => {
  const form = new Form<T>();

  for (const control of controls) {
    form.controls[control.name] = control;
  }
  return form;
};

/**
 * A control object.
 */
class Control<T> {
  name: string;
  value?: Writable<T>;
  data?: T[];
  displayFn?: (item: T) => string;
  disabled?: boolean;
  max?: number;
  validators?: Validator<T>[];
  errors?: Writable<Record<string, string[]>> = writable({});

  constructor(obj: Control<T>) {
    Object.assign(this, obj);
  }
}

/**
 * Create a control.
 * @param name - The name of the control.
 * @param value - The value of the control.
 * @param props - The properties of the control.
 * @returns Returns a {Control} object.
 */
export const createControl = <T>(config: Control<T>): Control<T> => {
  return new Control<T>(config);
};

export const getValues = <T>(form: Form<T>): Writable<Record<string, T>> => {
  return form.values;
};
