import { type Snippet } from "svelte";

import type { Form } from "./form";

import type { ValidationResult, Validator } from "./validators/validator";

export enum ControlType {
  text = "text",
  options = "options",
  boolean = "boolean"
}

export type ControlConfig = {
  name: string;
  type: ControlType;
  value?: any;
  disabled?: boolean;
  group?: string;
  validators?: Validator<any>[];
  props?: Record<string, any>;
};

export class Control<T = any> {
  name: string;
  type: ControlType;
  group?: string;
  placeholder?: T;
  class?: string;
  validators?: Validator<any>[];
  props?: Record<string, any>;

  #form: Form;
  #value = $state<T>();
  #disabled = $state<boolean>();
  #component: Snippet;
  #errors = $state<ValidationResult | ValidationResult[]>();
  #pristine = $state<boolean>(true);
  #valid = $state<boolean>(true);
  #deleted = $state(false);

  constructor(form: Form, control: ControlConfig) {
    this.form = form;
    this.name = control.name;
    this.type = control.type;
    this.group = control.group;
    this.validators = control.validators;
    this.props = control.props;

    this.#value = control.value;
    this.#disabled = control.disabled;
  }

  get form() {
    return this.#form;
  }

  set form(val: Form) {
    this.#form = val;
    this.#pristine = false;
  }

  get value() {
    return this.#value;
  }

  set value(val: T) {
    this.#value = val;
    this.validate();
  }

  get disabled() {
    return this.#disabled;
  }

  set disabled(val: boolean) {
    this.#disabled = val;
  }

  get errors() {
    return this.#errors;
  }

  set errors(val: ValidationResult | ValidationResult[]) {
    this.#errors = val;
    this.#valid = Array.isArray(val) ? val.every((v) => v.valid) : val.valid;
  }

  get component() {
    return this.#component;
  }

  get pristine() {
    return this.#pristine;
  }

  get valid() {
    return this.#valid;
  }

  set valid(val: boolean) {
    this.#valid = val;
  }

  get deleted() {
    return this.#deleted;
  }

  validate() {
    const result = this.validators?.map((v) => v.fn(this.value)) ?? [];
    const flatResults = result.flat();
    this.errors = flatResults;
    this.valid = flatResults.every((v) => v.valid);
    return flatResults;
  }

  create() {
    const cmp = ControlComponents[this.type];
    // const div = document.createElement("div");
    // const a = await import("./controls/input.svelte");
    // console.log(a);
    // const cmp = a.default(div, {
    //   control: this,
    //   form: null,
    //   props: {
    //     control: this,
    //     form: null
    //   }
    // });
    return cmp;
    // return {
    //   domNodes: [content]
    // };
  }

  delete() {
    // console.log("delete", this.name);
    // this.#deleted = true;
    // this.#component = null;
    // this.#value = null;
    // this.#disabled = null;
    // this.#errors = null;
    // this.#pristine = null;
    // this.#valid = null;
    // this.form?.controls.remove(this.name);
  }
}
