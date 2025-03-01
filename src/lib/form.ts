import type { Control, ControlConfig } from "./control.svelte";
import { ControlsContainer } from "./controls.svelte";
import { FormGroup } from "./group";

export class Form {
  controls: ControlsContainer = new ControlsContainer();

  constructor(form?: Form) {
    if (form) {
      this.controls = form.controls;
    }
  }

  addControl(control: ControlConfig): Control {
    return this.controls.add(control);
  }

  getGroup(name: string): FormGroup {
    return new FormGroup({
      name,
      controls: this.controls.filter((control) => control.group === name)
    });
  }
}

export const createForm = (form?: Form): Form => {
  const instance = new Form(form);

  return instance;
};
