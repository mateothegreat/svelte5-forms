<script lang="ts">
  import { Label, Switch } from "bits-ui";
  import { onMount, type Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { useContext } from "../attic/context";
  import Validation from "../validators/validation.svelte";

  type Props = {
    name: string;
    placeholder?: string;
    value?: any;
    class?: string;
    type?: string;
    children?: Snippet;
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

  onMount(() => validate());
</script>

<div class={twMerge("flex items-center justify-between space-x-3", className)}>
  <Label.Root
    for="dnd"
    class="text-sm font-medium">
    {@render children()}
  </Label.Root>
  <Switch.Root
    onCheckedChange={(checked) => {
      ctx.form.controls[name].value = checked;
      validate();
    }}
    class="peer inline-flex h-5 w-10 cursor-pointer items-center rounded-full bg-gray-600 px-0.5 transition-colors focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300">
    <Switch.Thumb
      class="pointer-events-none block h-4 w-4 transform rounded-full bg-black shadow transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
  </Switch.Root>
</div>

<Validation results={ctx.form.controls[name].errors} />
