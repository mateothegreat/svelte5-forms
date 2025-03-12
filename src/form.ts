import type { Component } from "svelte";

import type { Control, ControlConfig, ControlType } from "./control.svelte";
import { ControlsContainer } from "./controls.svelte";

export type FormState = Record<string, Pick<Control, "value" | "disabled" | "errors" | "pristine" | "valid" | "type">>;

export type FormConfig = {
  name?: string;
};

export class Form {
  name?: string;
  components: Partial<{
    [K in ControlType]: Component<any>;
  }> = {};
  controls: ControlsContainer = new ControlsContainer();

  constructor(form?: FormConfig) {
    this.name = form?.name || Math.random().toString(36).substring(2, 15);
  }

  add(control: ControlConfig): Control {
    return this.controls.add(this, control);
  }

  state(): FormState {
    return this.controls.state();
  }

  values(): Record<string, any> {
    return this.controls.values();
  }
}

export const createForm = (config?: FormConfig): Form => {
  return new Form(config);
};
