<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  type Props = {
    class?: string;
    children: Snippet;
  };

  let { children, class: className }: Props = $props();
</script>

<label class={twMerge("text-sm font-medium disabled:opacity-50 dark:text-slate-400", className)}>
  {@render children()}
</label>
