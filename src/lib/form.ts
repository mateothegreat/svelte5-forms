import { FormGroup } from "./attic/group";
import type { Control, ControlConfig } from "./control.svelte";
import { ControlsContainer } from "./controls.svelte";

export type FormState = Record<string, Pick<Control, "value" | "disabled" | "errors" | "pristine" | "valid" | "type">>;

export class Form {
  name?: string;
  controls: ControlsContainer = new ControlsContainer();

  constructor(form?: Form) {
    this.name = form?.name || Math.random().toString(36).substring(2, 15);

    for (const control of form?.controls.items() || []) {
      this.add(control);
    }
  }

  add(control: ControlConfig): Control {
    return this.controls.add(this, control);
  }

  getGroup(name: string): FormGroup {
    return new FormGroup({
      name,
      controls: this.controls.filter((control) => control.group === name)
    });
  }

  state(): FormState {
    return this.controls.state();
  }

  values(): Record<string, any> {
    return this.controls.values();
  }
}

export const createForm = (form?: Form): Form => {
  return new Form(form);
};
