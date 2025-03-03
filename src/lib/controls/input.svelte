<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import type { ControlProps } from "../control.svelte";

  let { control, ...rest }: ControlProps = $props();
</script>

<div class="m-5 bg-slate-800">
  {JSON.stringify(control)}
</div>
asdf
<input
  bind:value={control.value}
  name={control.name}
  placeholder={control.placeholder}
  type={control.type}
  class={twMerge(
    `
    placeholder:text-muted-foreground
    flex
    h-9
    w-full
    rounded-[5px]
    border-2
    border-slate-600
    bg-zinc-950
    px-3
    py-1
    text-sm
    shadow-sm
    transition-colors
    file:border-0
    file:bg-transparent
    file:text-sm
    file:font-medium
    focus-visible:ring-2
    focus-visible:ring-indigo-500
    focus-visible:outline-none
    disabled:cursor-not-allowed
    disabled:opacity-50
  `,
    control.class
  )}
  {...rest} />

<!-- <Validation results={control.errors} /> -->
