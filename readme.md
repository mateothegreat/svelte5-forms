# Svelte 5 forms w00t w00t

A simple form library for Svelte that uses tailwind and bits-ui.

![screenshot](./screenshot.png)

## Installation

```bash
npm install @mateothegreat/svelte-5-forms
```

## Usage

```svelte
<script lang="ts">
  import * as Form from "@mateothegreat/svelte5-forms";
  import { createControl, createForm, minLength } from "@mateothegreat/svelte5-forms";
  import { Palette } from "phosphor-svelte";

  type MyDataType1 = {
    name: string;
    emaild: string;
  };

  const items = [
    { value: "mango", label: "Mango" },
    { value: "watermelon", label: "Watermelon" },
    { value: "apple", label: "Apple" }
  ];

  const form = createForm<MyDataType1>("form-1", [
    createControl({
      name: "name",
      value: "mateothegreat",
      validators: [minLength(3)]
    }),
    createControl({
      name: "asdf",
      data: items,
      validators: [minLength(2)],
      displayFn: (data) => {
        return data.label;
      }
    }),
    createControl({
      name: "agree",
      validators: [minLength(2)]
    })
  ]);
</script>

{#snippet selectPrefix()}
  <div class="text-muted-foreground">
    <Palette class="size-6 dark:text-sky-600" />
  </div>
{/snippet}

<div class="absolute flex h-full w-full items-center justify-center gap-14 bg-zinc-900 p-10">
  <div class="w-96 rounded-lg bg-black p-4 shadow-xl">
    <Form.Group>
      <Form.Field>
        <Form.Header.Root>
          <Form.Header.Label>Name</Form.Header.Label>
          <Form.Header.Description>Foo bar baz pow.</Form.Header.Description>
        </Form.Header.Root>
        <Form.Controls.Input {form} name="name" />
      </Form.Field>
      <Form.Field>
        <Form.Header.Root>
          <Form.Header.Label>Name</Form.Header.Label>
          <Form.Header.Description>Foo bar baz pow.</Form.Header.Description>
        </Form.Header.Root>
        <Form.Controls.Select
          {form}
          placeholder="Select something cool.."
          name="asdf"
          type="multiple"
          prefix={selectPrefix} />
      </Form.Field>
    </Form.Group>
    <Form.Group>
      <Form.Field>
        <Form.Header.Root>
          <Form.Header.Label>Name</Form.Header.Label>
          <Form.Header.Description>Foo bar baz pow.</Form.Header.Description>
        </Form.Header.Root>
        <Form.Controls.Switch {form} name="agree" class="rounded-lg border-2 border-slate-800 bg-zinc-900/40 p-2">
          <span class="text-xs text-sky-500">I agree to be awesome.</span>
        </Form.Controls.Switch>
      </Form.Field>
    </Form.Group>
  </div>
  <div class="w-96 rounded-lg bg-black p-4 shadow-xl">
    <pre class="text-xs text-slate-500">{JSON.stringify(form.values, null, 2)}</pre>
  </div>
</div>
```