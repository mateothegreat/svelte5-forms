<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import Badge from "../lib/components/badge.svelte";
  import type { ControlProps } from "./types";

  let {
    control,
    label,
    ...rest
  }: ControlProps & {
    label?: string;
  } = $props();
</script>

<div class="flex gap-2">
  <div class="flex flex-1 flex-col gap-2">
    <label
      class="text-sm font-medium text-indigo-500"
      for={control.name}>
      {label}
    </label>
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
  </div>
  <div class="m-5 flex w-56 flex-col gap-4 rounded-[5px] border-1 border-indigo-700 bg-gray-900/80 p-2">
    <Badge class="justify-start bg-green-800 font-bold text-white">control values</Badge>
    <table class="mx-1">
      <tbody>
        <tr>
          <td class="w-30">control.value:</td>
          <td class="p-1 text-indigo-400">{control.value}</td>
        </tr>
        <tr>
          <td class="w-30">control.pristine:</td>
          <td
            class="p-1"
            class:text-green-500={control.pristine}
            class:text-orange-400={!control.pristine}>
            {control.pristine}
          </td>
        </tr>
        <tr>
          <td class="w-30">control.valid:</td>
          <td
            class="p-1"
            class:text-green-500={control.valid}
            class:text-orange-400={!control.valid}>
            {control.valid}
          </td>
        </tr>
        <tr>
          <td class="w-30">control.disabled:</td>
          <td
            class="p-1"
            class:text-pink-500={control.disabled}
            class:text-green-500={!control.disabled}>
            {control.disabled ? "disabled" : "enabled"}
          </td>
        </tr>
      </tbody>
    </table>
    <Badge class="justify-start bg-slate-600 font-bold">...rest $props():</Badge>
    <pre>{JSON.stringify(rest, null, 2)}</pre>
  </div>
</div>
