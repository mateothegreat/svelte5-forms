<script lang="ts">
  import * as Form from "@mateothegreat/svelte5-forms";
  import { FormInstance, minLength, required } from "@mateothegreat/svelte5-forms";
  import { Palette } from "phosphor-svelte";

  type MyDataType1 = {
    name: string;
    foobar: {
      value: string;
      label: string;
    }[];
    agree: boolean;
  };

  const items = [
    { value: "mango", label: "Mango" },
    { value: "watermelon", label: "Watermelon" },
    { value: "apple", label: "Apple" }
  ];

  let form: FormInstance;
  let valid: boolean;

  const controls = $state([
    {
      name: "name",
      value: "mateothegreat",
      validators: [minLength(3)]
    },
    {
      name: "foobar",
      data: items,
      validators: [minLength(2)],
      displayFn: (data: (typeof items)[number]) => {
        return data.label;
      }
    },
    {
      name: "textarea1",
      validators: [minLength(3)]
    },
    {
      name: "agree",
      validators: [required()]
    }
  ]);

  const controls2 = $state([
    {
      name: "name",
      value: "mateothegreat",
      validators: [minLength(3)]
    }
  ]);

  $effect(() => {
    console.log("form22", form);
  });
</script>

{#snippet selectPrefix()}
  <div class="text-muted-foreground">
    <Palette class="size-6 dark:text-sky-600" />
  </div>
{/snippet}

<div class="absolute flex h-full w-full items-center justify-center gap-4 bg-zinc-900 p-10">
  <div class="w-96 rounded-lg bg-black p-4 shadow-xl">
    <Form.Root bind:form {controls}>
      <Form.Group>
        <Form.Field>
          <Form.Header.Root>
            <Form.Header.Label>Name</Form.Header.Label>
            <Form.Header.Description>Foo bar baz pow.</Form.Header.Description>
          </Form.Header.Root>
          <Form.Controls.Input name="name" />
        </Form.Field>
        <Form.Field>
          <Form.Header.Root>
            <Form.Header.Label>Textarea</Form.Header.Label>
            <Form.Header.Description>Foo bar baz pow.</Form.Header.Description>
          </Form.Header.Root>
          <Form.Controls.Textarea name="textarea1" />
        </Form.Field>
        <Form.Field>
          <Form.Header.Root>
            <Form.Header.Label>Foo Bar</Form.Header.Label>
            <Form.Header.Description>Foo bar baz pow.</Form.Header.Description>
          </Form.Header.Root>
          <Form.Controls.Select
            {form}
            placeholder="Select something cool.."
            name="foobar"
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
          <Form.Controls.Switch name="agree" class="rounded-lg border-2 border-slate-800 bg-zinc-900/40 p-2">
            <span class="text-xs text-sky-500">I agree to be awesome.</span>
          </Form.Controls.Switch>
        </Form.Field>
      </Form.Group>
    </Form.Root>
  </div>
  <div class="flex w-96 flex-col gap-4 rounded-lg bg-black p-4 shadow-xl">
    <pre class="rounded-lg bg-zinc-900/75 p-2 text-xs text-slate-500">values: {JSON.stringify(form.values, null, 2) ||
        "none"}</pre>
    <pre class="rounded-lg bg-zinc-900/75 p-2 text-xs text-slate-500">errors: {JSON.stringify(form.errors, null, 2) ||
        "none"}</pre>
    <pre class="rounded-lg bg-zinc-900/75 p-2 text-xs text-slate-500">valid: {form.valid}</pre>
  </div>
</div>
<!-- <Form.Root bind:form controls={controls2}>
  <Form.Group>ReadableStreamDefaultController</Form.Group>
</Form.Root> -->
