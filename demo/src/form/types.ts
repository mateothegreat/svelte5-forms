import { ControlType, type Control } from "$lib/control.svelte";
import ReusableInput from "./reusable-input.svelte";

export type ControlProps = {
  control: Control;
  props: {
    label?: string;
    foo?: string;
  };
};

export const ControlMapping = {
  [ControlType.text]: ReusableInput
};
