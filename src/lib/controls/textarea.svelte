<script lang="ts">
  import { onMount } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { useContext } from "../context";
  import Validation from "../validators/validation.svelte";

  type Props = {
    name: string;
    placeholder?: string;
    value?: any;
    class?: string;
    type?: string;
  };

  let { control, form, ...rest }: ControlProps = $props();

  const ctx = useContext();

  const validate = () => {
    ctx.form.controls[name].errors = {};
    if (ctx.form.controls[name].validators) {
      for (const validator of ctx.form.controls[name].validators) {
        const result = validator.fn(ctx.form.controls[name].value);
        if (result && result.length > 0) {
          ctx.form.controls[name].errors[validator.name] = result;
        }
      }
    }
    ctx.form.controls[name].valid = Object.values(ctx.form.controls[name].errors).every((error) => error.length === 0);
  };

  onMount(() => {
    validate();
  });
</script>

<textarea
  bind:value={ctx.form.controls[name].value}
  onchange={(e: Event) => {
    validate();
  }}
  {name}
  {placeholder}
  {type}
  class={twMerge(
    "placeholder:text-muted-foreground focus-visible:ring-ring flex h-20 w-full rounded-md border-2 border-slate-800 bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
    className
  )}
  {...rest} />

<Validation results={ctx.form.controls[name].errors} />
