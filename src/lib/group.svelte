<script lang="ts">
  import type { Snippet } from "svelte";
  export { group };
</script>

{#snippet group(children: Snippet[])}
  <div>Group</div>
  {#each children as child}
    <div>
      rendering child
      {@render child()}
    </div>
  {/each}
{/snippet}
