<script lang="ts">
  import type { Form } from "$lib/form";
  import { onDestroy } from "svelte";
  import { randomControl } from "../simulation.svelte";
  import Wrapper from "./../../../../src/lib/controls/wrapper.svelte";

  let {
    form,
    ...rest
  }: {
    form: Form;
  } = $props();

  const control = randomControl(form);

  let h: HTMLDivElement;
  let instance: Wrapper;

  // Track if control is deleted
  const isDeleted = $derived(control.deleted);

  function handleRemove() {
    control.delete();
  }

  onDestroy(() => {
    console.log("random-control onDestroy", control.name);
    control.delete();
  });
</script>

{#if !isDeleted}
  name: {control.name}
  <div bind:this={h}>
    <Wrapper
      {control}
      bind:this={instance} />
  </div>
  <div class="flex gap-2">
    <button class="green">Add</button>
    <button
      on:click={handleRemove}
      class="red">
      Remove
    </button>
  </div>
{/if}
