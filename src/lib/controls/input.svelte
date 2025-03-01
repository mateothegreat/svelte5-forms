<script lang="ts">
  import { onMount } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { useContext } from "../context";
  import type { ControlProps } from "../control.svelte";
  import Validation from "../validators/validation.svelte";

  let { control, form, ...rest }: ControlProps = $props();

  const ctx = useContext();

  const validate = () => {
    // ctx.form.controls[name].errors = {};
    // if (ctx.form.controls[name].validators) {
    //   for (const validator of ctx.form.controls[name].validators) {
    //     const result = validator.fn(ctx.form.controls[name].value);
    //     if (result && result.length > 0) {
    //       ctx.form.controls[name].errors[validator.name] = result;
    //     }
    //   }
    // }
    // ctx.form.controls[name].valid = Object.values(ctx.form.controls[name].errors).every((error) => error.length === 0);
  };

  onMount(() => {
    console.log(control);
    validate();
  });
</script>

<div class="bg-slate-800 m-5">
  {JSON.stringify(control)}
</div>

<input
  bind:value={control.value}
  onchange={(e: Event) => {
    validate();
  }}
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
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-indigo-500
    disabled:cursor-not-allowed
    disabled:opacity-50
  `,
    control.class
  )}
  {...rest} />

<Validation results={control.errors} />
