import type { Control } from "../control.svelte";

export type FormGroupConfig = {
  name?: string;
  controls: Control[];
};

export class FormGroup {
  name?: string;
  controls: Control[];

  constructor(group?: FormGroupConfig) {
    if (group) {
      this.name = group.name;
      this.controls = group.controls;
    }
  }
}

export const createFormGroup = (group?: FormGroupConfig): FormGroup => {
  return new FormGroup(group);
};
