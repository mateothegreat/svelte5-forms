<script lang="ts">
  import type { ValidationResult } from "./validator";

  type Props = {
    results: ValidationResult[];
  };

  let { results }: Props = $props();
</script>

{#snippet error(messages: string | string[])}
  {#if typeof messages === "string"}
    <div class="flex justify-end text-xs text-pink-500">{messages}</div>
  {:else}
    {#each messages as message}
      <div class="flex justify-end text-xs text-pink-500">{message}</div>
    {/each}
  {/if}
{/snippet}

{#if results}
  <div>
    {#each results as result}
      {@render error(result.message)}
    {/each}
  </div>
{/if}
