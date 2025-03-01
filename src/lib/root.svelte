<script lang="ts">
  import { render } from "svelte/server";
  import type { FormGroup } from "./group";

  // const ctx = createContext(createForm<any>(controls));
  // form = ctx.form;
  // console.log("form", children.call({}));
  let x: HTMLDivElement;

  type Props = {
    groups: FormGroup[];
  };

  let { form, ...props } = $props();

  console.log(form);
  $inspect(form);
</script>

{#each form.groups as group}
  {group.controls.length}
  {#each group.controls as control, i}
    {@render control({
      control,
      i
    })}
  {/each}
{/each}
