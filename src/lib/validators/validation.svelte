<script lang="ts">
  type Props = {
    results: Record<string, string[]>;
  };

  let { results }: Props = $props();
</script>

{#snippet error(messages: string[])}
  {#each messages as message}
    <div class="flex justify-end text-xs text-pink-500">{message}</div>
  {/each}
{/snippet}

{#if results}
  <div>
    {#each Object.entries(results) as [key, result]}
      {@render error(result)}
    {/each}
  </div>
{/if}
