<script
  lang="ts"
  generics="T">
  import { Select } from "bits-ui";
  import CaretDoubleDown from "phosphor-svelte/lib/CaretDoubleDown";
  import CaretDoubleUp from "phosphor-svelte/lib/CaretDoubleUp";
  import CaretUpDown from "phosphor-svelte/lib/CaretUpDown";
  import Check from "phosphor-svelte/lib/Check";
  import { onMount, type Snippet } from "svelte";
  import { Validation } from "..";
  import { useContext } from "./context";

  type Props<T> = any & {
    name: string;
    placeholder?: string;
    class?: string;
    data?: T[];
    children?: Snippet;
    prefix?: Snippet;
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

  // onMount(() => validate());
  if (!ctx.form.controls[name]) {
    throw new Error(`Control ${name} not found`);
  }

  onMount(() => validate());
</script>

<Select.Root
  onValueChange={validate}
  bind:value={ctx.form.controls[name].value}
  {...rest}
  class={className}>
  <Select.Trigger class="border-border-input bg-background inline-flex h-10 items-center rounded-lg border-2 border-slate-800 px-[11px] text-sm transition-colors select-none">
    {#if prefix}
      <div class="mr-1">
        {@render prefix()}
      </div>
    {/if}
    {#if Array.isArray(ctx.form.controls[name].value) && ctx.form.controls[name].value.length > 0}
      {ctx.form.controls[name].value.join(", ")}
    {:else}
      <div class="text-muted-foreground">{placeholder}</div>
    {/if}
    <CaretUpDown class="ml-auto size-5 dark:text-slate-500" />
  </Select.Trigger>
  <Select.Portal>
    <Select.Content
      class="border-muted bg-background shadow-popover max-h-96 w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] rounded-xl border px-1 py-1 outline-none"
      sideOffset={10}>
      <Select.ScrollUpButton class="flex w-full items-center justify-center">
        <CaretDoubleUp class="size-3" />
      </Select.ScrollUpButton>
      <Select.Viewport class="p-1">
        {#each ctx.form.controls[name].data as item}
          <Select.Item
            class="rounded-button data-[highlighted]:bg-muted flex h-9 w-full items-center py-3 pr-1.5 pl-5 text-sm capitalize duration-75 outline-none select-none"
            value={ctx.form.controls[name].displayFn ? ctx.form.controls[name].displayFn(item) : String(item)}>
            {#snippet children({ selected })}
              {#if ctx.form.controls[name].displayFn}
                {ctx.form.controls[name].displayFn(item)}
              {/if}
              {#if selected}
                <div class="ml-auto">
                  <Check />
                </div>
              {/if}
            {/snippet}
          </Select.Item>
        {/each}
      </Select.Viewport>
      <Select.ScrollDownButton class="flex w-full items-center justify-center">
        <CaretDoubleDown class="size-3" />
      </Select.ScrollDownButton>
    </Select.Content>
  </Select.Portal>
</Select.Root>

<Validation results={ctx.form.controls[name].errors} />
