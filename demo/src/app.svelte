<script lang="ts">
  import { ControlType } from "$lib/control.svelte";
  import { createForm } from "$lib/form";
  import * as Form from "@mateothegreat/svelte5-forms";
  import { Palette } from "phosphor-svelte";

  const form = createForm();

  const getRandomControlType = () => {
    return Object.values(ControlType)[Math.floor(Math.random() * Object.values(ControlType).length)];
  };

  // Initial controls - spread out the initial creation more evenly
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      if (form.controls.size < 20) {
        form.addControl({
          name: Math.random().toString(36).substring(2, 8),
          type: getRandomControlType(),
          group: "group-1"
        });
      }
    }, i * 100); // More consistent spacing between initial additions
  }

  // Randomly add and remove controls - adjusted probability and interval
  setInterval(() => {
    if (Math.random() > 0.5 && form.controls.size < 20) {
      // More balanced 50/50 chance
      form.addControl({
        name: Math.random().toString(36).substring(2, 8),
        type: getRandomControlType(),
        group: "group-1"
      });
    } else if (form.controls.size > 0) {
      const controls = form.controls.items();
      const randomControl = controls[Math.floor(Math.random() * controls.length)];
      form.controls.remove(randomControl.name);
    }
  }, 100); // Slightly slower rate for more stability

  // Value updates - more consistent frequency
  setInterval(() => {
    const controls = form.controls.items();
    if (controls.length > 0) {
      const updateCount = 5; // Fixed number of updates per interval
      for (let i = 0; i < updateCount; i++) {
        const randomControl = controls[Math.floor(Math.random() * controls.length)];
        if (randomControl) {
          randomControl.value = Math.random() > 0.5 ? Math.random().toFixed(5) : null; // 50/50 chance
        }
      }
    }
  }, 300);

  // Disable controls - more predictable updates
  setInterval(() => {
    const controls = form.controls.items();
    if (controls.length > 0) {
      const updateCount = 5; // Fixed number of updates per interval
      for (let i = 0; i < updateCount; i++) {
        const randomControl = controls[Math.floor(Math.random() * controls.length)];
        if (randomControl) {
          randomControl.disabled = Math.random() > 0.5; // 50/50 chance
        }
      }
    }
  }, 400);

  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      import.meta.hot!.invalidate();
    });
  }

  const v = $derived(form.controls.valuesFor("value", "disabled", "type"));
  $effect(() => {
    // console.log(new Date().toISOString(), form.controls.size, Object.values(form.controls.values()));
  });

  // setTimeout(() => {
  //   console.log(
  //     new Date().toISOString(),
  //     form.controls.size,
  //     Object.values(form.controls.values()).filter((v: any) => v).length
  //   );
  // }, 1000);
</script>

<div class="m-5 w-fit flex flex-col gap-4 border border-gray-900 rounded-lg">
  <table class="divide-y divide-gray-900">
    <thead class="text-left bg-gray-900">
      <tr>
        <th class="w-40 text-center p-2">Control Name ({form.controls.size})</th>
        <th class="w-40 text-center p-2">Value</th>
        <th class="w-40 text-center p-2">Disabled</th>
        <th class="w-40 text-center p-2">Type</th>
      </tr>
    </thead>
    <tbody class="text-left divide-y divide-gray-900 font-mono">
      {#each Object.entries(v).sort((a, b) => a[0].localeCompare(b[0])) as [key, item]}
        <tr class="divide-y divide-gray-900">
          <td class="text-slate-500 text-center p-2">{key}</td>
          <td class="text-green-500 text-center p-2">{item.value}</td>
          <td class="text-center p-2" class:text-pink-500={item.disabled}>{item.disabled}</td>
          <td class="text-center p-2">{item.type}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
<!-- {#snippet groups(v)}
  <div>
    group:
    {JSON.stringify(v)}
  </div>
{/snippet} -->

<div class="absolute flex h-full w-full items-center justify-center gap-4 bg-zinc-900 p-10">
  <div class="w-96 rounded-lg bg-black p-4 shadow-xl">
    <Form.Root {form}>
      <!-- <svelte:component this={add} props={form} /> -->
      <!-- <add props={form} /> -->
      <!-- <add a={1} b={2} /> -->

      <!-- <div>- a</div>
      <div>- b</div>
      <div>- c</div> -->
      <Form.Group></Form.Group>
    </Form.Root>
  </div>
  <!-- <div class="flex w-96 flex-col gap-4 rounded-lg bg-black p-4 shadow-xl">
    <pre class="rounded-lg bg-zinc-900/75 p-2 text-xs text-slate-500">values: {JSON.stringify(form.values, null, 2) ||
        "none"}</pre>
    <pre class="rounded-lg bg-zinc-900/75 p-2 text-xs text-slate-500">errors: {JSON.stringify(form.errors, null, 2) ||
        "none"}</pre>
    <pre class="rounded-lg bg-zinc-900/75 p-2 text-xs text-slate-500">valid: {form.valid}</pre>
  </div> -->
</div>
<!-- <Form.Root bind:form controls={controls2}>
  <Form.Group>ReadableStreamDefaultController</Form.Group>
</Form.Root> -->
{#snippet selectPrefix()}
  <div class="text-muted-foreground">
    <Palette class="size-6 dark:text-sky-600" />
  </div>
{/snippet}
