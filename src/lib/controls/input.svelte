<script lang="ts">
  import { onMount } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { Instance } from "..";
  import Validation from "../validators/validation.svelte";

  type Props = {
    form: Instance<any>;
    name: string;
    placeholder?: string;
    value?: any;
    class?: string;
    type?: string;
  };

  let { form, name, placeholder, value, class: className, type = "text", ...rest }: Props = $props();

  const validate = () => {
    form.controls[name].errors = {};
    if (form.controls[name].validators) {
      for (const validator of form.controls[name].validators) {
        const result = validator.fn(form.controls[name].value);
        if (result && result.length > 0) {
          form.controls[name].errors[validator.name] = result;
        }
      }
    }
    form.controls[name].valid = Object.values(form.controls[name].errors).every((error) => error.length === 0);
  };

  onMount(() => validate());
</script>

<input
  bind:value={form.controls[name].value}
  onchange={(e) => {
    console.log(e);
    validate();
  }}
  {name}
  {placeholder}
  {type}
  class={twMerge(
    "placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border-2 border-slate-800 bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
    className
  )}
  {...rest} />

<Validation results={form.controls[name].errors} />
