<script lang="ts">
  import { Label, Switch } from "bits-ui";
  import { onMount, type Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";
  import type { FormInstance } from "../types";
  import Validation from "../validators/validation.svelte";

  type Props = {
    form: FormInstance<any>;
    name: string;
    placeholder?: string;
    value?: any;
    class?: string;
    type?: string;
    children?: Snippet;
  };

  let { form, name, placeholder, value, class: className, type = "text", children, ...rest }: Props = $props();

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
  };

  onMount(() => validate());
</script>

<div class={twMerge("flex items-center justify-between space-x-3", className)}>
  <Label.Root for="dnd" class="text-sm font-medium">
    {@render children()}
  </Label.Root>
  <Switch.Root
    class="peer inline-flex h-5 w-10 cursor-pointer items-center rounded-full bg-gray-600 px-0.5 transition-colors focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300">
    <Switch.Thumb
      class="pointer-events-none block h-4 w-4 transform rounded-full bg-black shadow transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
  </Switch.Root>
</div>

<Validation results={form.controls[name].errors} />
