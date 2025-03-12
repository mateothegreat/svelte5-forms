<script lang="ts">
  import { ControlType, createForm } from "@mateothegreat/svelte5-forms";
  import { CheckCircle2, Pause, Play, XCircle } from "lucide-svelte";
  import CustomForm from "./form/custom-form.svelte";
  import Badge from "./lib/components/badge.svelte";
  import { get, start, stop } from "./lib/simulation.svelte";

  const form = createForm({
    name: "simulation"
  });

  form.add({
    name: "test-1",
    type: ControlType.text,
    props: {
      protected: true
    }
  });

  form.add({
    name: "test-2",
    type: ControlType.text,
    props: { protected: true }
  });

  const values = $derived(form.controls.valuesFor("value", "disabled", "type", "valid", "pristine"));

  let { disabled, enabled } = $state({ disabled: 0, enabled: 0 });
  let { pristine, dirty } = $state({ pristine: 0, dirty: 0 });
  let { valid, invalid } = $state({ valid: 0, invalid: 0 });

  /**
   * Counters for rendering the demo table.
   *
   * We filter out deleted controls from the derived values
   * and then reduce the controls to the counters.
   */
  $effect(() => {
    const activeControls = form.controls.items().filter((c) => !c.deleted);

    ({ disabled, enabled } = activeControls.reduce(
      (acc, control) => ({
        disabled: acc.disabled + (control?.disabled ? 1 : 0),
        enabled: acc.enabled + (control?.disabled ? 0 : 1)
      }),
      { disabled: 0, enabled: 0 }
    ));
    ({ pristine, dirty } = Object.entries(form.controls.valuesFor("pristine")).reduce(
      (acc, [key, control]) => ({
        pristine: acc.pristine + (control?.pristine ? 1 : 0),
        dirty: acc.dirty + (control?.pristine ? 0 : 1)
      }),
      { pristine: 0, dirty: 0 }
    ));
    ({ valid, invalid } = Object.entries(form.controls.valuesFor("valid")).reduce(
      (acc, [key, control]) => ({
        valid: acc.valid + (control?.valid ? 1 : 0),
        invalid: acc.invalid + (control?.valid ? 0 : 1)
      }),
      { valid: 0, invalid: 0 }
    ));
  });

  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      import.meta.hot!.invalidate();
    });
  }

  start(form, {
    create: true,
    values: true,
    remove: true,
    disable: true,
    interval: 100,
    maxControls: 1000,
    update: 100
  });

  let x: HTMLDivElement;
</script>

<div class="flex flex-col gap-5 text-[12px]">
  <div
    class="flex h-10 animate-pulse items-center gap-2 border-b-2 bg-indigo-950/60 p-2"
    class:animate-pulse-running={get().running}
    class:animate-pulse-stopped={!get().running}>
    <div class="flex flex-1 text-sm text-slate-400/50">
      @mateothegreat/
      <span class="font-semibold text-green-500">svelte5-forms</span>
    </div>
    <div
      class="flex animate-pulse items-center justify-center gap-2 rounded-b-xl border-2 bg-black px-4 py-2"
      class:animate-pulse-running={get().running}
      class:animate-pulse-stopped={!get().running}>
      <div class="relative -top-[2px] flex items-center justify-center gap-2 rounded-b-xl bg-black pt-3">
        <div class="flex items-center justify-center gap-1">
          simulation is
          <span class="font-semibold {get().running ? 'text-green-500' : 'text-fuchsia-600'}">{get().running ? "running" : "stopped"}</span>
        </div>
        {#if get().running}
          <button
            onclick={() => stop(form)}
            class="fuchsia">
            <Pause class="h-3 w-3" />
          </button>
        {:else}
          <button
            onclick={() => start(form)}
            class="green">
            <Play class="h-3 w-3" />
          </button>
        {/if}
      </div>
    </div>
    <div class="flex flex-1 justify-end">sdf</div>
  </div>
  <div class="mx-4 flex h-[50vh] gap-3">
    <div class="scrollbar-dark flex flex-col gap-4 overflow-hidden overflow-y-auto rounded-[7px] border-2 border-indigo-700">
      <table class="divide-y divide-gray-900">
        <thead class="bg-gray-900 text-left">
          <tr>
            <th class="w-40 p-2 text-center">Control Name</th>
            <th class="w-40 p-2 text-center">Value</th>
            <th class="w-40 p-2 text-center">Enabled</th>
            <th class="w-40 p-2 text-center">Type</th>
            <th class="w-40 p-2 text-center">Pristine</th>
            <th class="w-40 p-2 text-center">Valid</th>
          </tr>
        </thead>
        <thead class="bg-slate-900/50 text-left">
          <tr>
            <th class="w-40 p-2 text-center">{form.controls.size}</th>
            <th class="w-40 p-2 text-center">Value</th>
            <th class="w-40 p-2 text-center">
              <Badge class="w-7 bg-green-500 text-white">{enabled}</Badge>
              <Badge class="w-7 bg-pink-500 text-white">{disabled}</Badge>
            </th>
            <th class="w-40 p-2 text-center">Type</th>
            <th class="w-40 p-2 text-center">
              <Badge class="w-7 bg-green-500 text-white">{pristine}</Badge>
              <Badge class="w-7 bg-pink-500 text-white">{dirty}</Badge>
            </th>
            <th class="w-40 p-2 text-center">
              <Badge class="w-7 bg-green-500 text-white">{valid}</Badge>
              <Badge class="w-7 bg-pink-500 text-white">{invalid}</Badge>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-900 text-left font-mono">
          {#each Object.entries(values)
            .filter(([_, item]) => !item.deleted)
            .sort((a, b) => a[0].localeCompare(b[0])) as [key, item]}
            <tr class="divide-y divide-gray-900">
              <td class="p-2 text-center text-slate-500">{key}</td>
              <td class="p-2 text-center text-green-500">{item.value}</td>
              <td
                class="p-2 text-center"
                class:text-pink-500={item.disabled}
                class:text-green-500={!item.disabled}>
                {item.disabled ? "disabled" : "enabled"}
              </td>
              <td class="p-2 text-center">{item.type}</td>
              <td
                class="p-2 text-center"
                class:text-green-500={item.pristine}>
                {item.pristine ? "pristine" : "dirty"}
              </td>
              <td
                class="p-2 text-center"
                class:text-green-500={item.valid}>
                {item.valid}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="scrollbar-dark flex h-[50vh] w-[50vw] flex-wrap gap-2 overflow-hidden overflow-y-scroll rounded-[7px] border-2 border-indigo-700 p-2">
      {#each Object.entries(form.state()) as [key, item]}
        <div class="flex h-fit flex-col gap-2 rounded-[5px] border border-gray-900 p-2">
          <div class="flex justify-between gap-2">
            <div class="flex items-center gap-1 text-indigo-500">
              {key}
              {#if item.valid}
                <CheckCircle2 class="h-3 w-3 text-green-500" />
              {:else}
                <XCircle class="h-3 w-3 text-red-500" />
              {/if}
            </div>
            <Badge class="text-white {item.valid ? 'bg-green-600' : 'bg-red-500'}">
              {item.valid ? "valid" : "invalid"}
            </Badge>
          </div>
          <div class="h-30 w-36 overflow-hidden text-[10px]">
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<CustomForm />

<style>
  .scrollbar-dark {
    scrollbar-width: thin;
    scrollbar-color: #1552a6 #1f2937;
  }

  .scrollbar-dark::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .scrollbar-dark::-webkit-scrollbar-track {
    background: #1f2937;
    border-radius: 6px;
  }

  .scrollbar-dark::-webkit-scrollbar-thumb {
    background-color: #1552a6;
    border-radius: 6px;
    border: 2px solid #1f2937;
  }

  .scrollbar-dark::-webkit-scrollbar-thumb:hover {
    background-color: #1552a6;
  }

  @keyframes pulse-running {
    0%,
    100% {
      border-color: rgb(55 55 57);
    }
    50% {
      border-color: rgb(34, 197, 94); /* green-500 when running */
    }
  }

  @keyframes pulse-stopped {
    0%,
    100% {
      border-color: rgb(55 55 57);
    }
    50% {
      border-color: rgb(217, 70, 239); /* fuchsia-500 when stopped */
    }
  }

  .animate-pulse-running {
    animation: pulse-running 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-pulse-stopped {
    animation: pulse-stopped 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>
