<script lang="ts" generics="T">
  import { Select } from "bits-ui";
  import CaretDoubleDown from "phosphor-svelte/lib/CaretDoubleDown";
  import CaretDoubleUp from "phosphor-svelte/lib/CaretDoubleUp";
  import CaretUpDown from "phosphor-svelte/lib/CaretUpDown";
  import Check from "phosphor-svelte/lib/Check";
  import { onMount, type Snippet } from "svelte";
  import { Validation, type Instance } from "..";

  type Props<T> = any & {
    form: Instance<T>;
    name: string;
    placeholder?: string;
    class?: string;
    data?: T[];
    children?: Snippet;
    prefix?: Snippet;
  };

  let { form, children, name, data, placeholder, class: className, prefix, ...rest }: Props<T> = $props();

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
    form.controls[name].valid = Object.values(form.controls[name].errors).every((error) => {
      return typeof error === "string" && error.length === 0;
    });
  };

  // onMount(() => validate());
  if (!form.controls[name]) {
    throw new Error(`Control ${name} not found`);
  }

  onMount(() => validate());
</script>

<Select.Root onValueChange={validate} bind:value={form.controls[name].value} {...rest} class={className}>
  <Select.Trigger
    class="border-border-input bg-background inline-flex h-10 select-none items-center rounded-lg border-2 border-slate-800 px-[11px] text-sm transition-colors">
    {#if prefix}
      <div class="mr-1">
        {@render prefix()}
      </div>
    {/if}
    {#if Array.isArray(form.controls[name].value) && form.controls[name].value.length > 0}
      {form.controls[name].value.join(", ")}
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
        {#each form.controls[name].data as item}
          <Select.Item
            class="rounded-button data-[highlighted]:bg-muted flex h-9 w-full select-none items-center py-3 pl-5 pr-1.5 text-sm capitalize outline-none duration-75"
            value={form.controls[name].displayFn ? form.controls[name].displayFn(item) : String(item)}>
            {#snippet children({ selected })}
              {#if form.controls[name].displayFn}
                {form.controls[name].displayFn(item)}
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

<Validation results={form.controls[name].errors} />
