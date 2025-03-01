import { mount, type Snippet } from "svelte";

import { Select, Switch, Textarea } from "./controls";
import type { Form } from "./form";

import Input from "./controls/input.svelte";
import type { ValidationResult } from "./validators/validator";

export enum ControlType {
  INPUT = "input",
  SELECT = "select",
  SWITCH = "switch",
  TEXTAREA = "textarea"
}

export const ControlComponents = {
  [ControlType.INPUT]: Input,
  [ControlType.SELECT]: Select,
  [ControlType.SWITCH]: Switch,
  [ControlType.TEXTAREA]: Textarea
};

export type ControlConfig = {
  name: string;
  type: ControlType;
  value?: any;
  disabled?: boolean;
  group?: string;
};

export type ControlProps = {
  form: Form;
  control: Control;
};

export class Control<T = any> {
  name: string;
  type: ControlType;
  group?: string;
  placeholder?: T;
  class?: string;

  #value = $state<T>();
  #disabled = $state<boolean>();
  #component: Snippet;
  #errors = $state<ValidationResult[]>([]);

  constructor(control: ControlConfig) {
    this.name = control.name;
    this.type = control.type;
    this.group = control.group;

    this.#value = control.value;
    this.#disabled = control.disabled;
  }

  get value() {
    return this.#value;
  }

  set value(val: T) {
    this.#value = val;
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

  set errors(val: ValidationResult[]) {
    this.#errors = val;
  }

  get component() {
    return this.#component;
  }

  create() {
    const content = document.createElement("div");
    mount(ControlComponents[this.type], {
      target: content,
      props: {
        control: this,
        form: null
      }
    });
    return {
      domNodes: [content]
    };
  }
}

export const createControl = <T>(control: ControlConfig): Control<T> => {
  return new Control(control);
};
