<script lang="ts">
  import { onDestroy } from "svelte";
  import { ControlComponents, type ControlProps } from "../control.svelte";

  export { a };
  const a = 123;
  let { control, instance = $bindable(), ...rest }: ControlProps = $props();
  const Control = ControlComponents[control.type];

  onDestroy(() => {
    console.log("onDestroy", instance);
    control.delete();
  });
</script>

<Control
  {control}
  {...rest} />
