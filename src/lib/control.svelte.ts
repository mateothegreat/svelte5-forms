export enum ControlType {
  INPUT = "input",
  SELECT = "select",
  SWITCH = "switch",
  TEXTAREA = "textarea"
}

export type ControlConfig = {
  name: string;
  type: ControlType;
  value?: any;
  disabled?: boolean;
  group?: string;
};

export class Control<T = any> {
  name: string;
  type: ControlType;
  group?: string;

  #value = $state<T>();
  #disabled = $state<boolean>();

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
}

export const createControl = <T>(control: ControlConfig): Control<T> => {
  return new Control(control);
};
