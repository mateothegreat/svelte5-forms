<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  type Props = {
    class?: string;
    children: Snippet;
  };

  let { children, class: className }: Props = $props();
</script>

<p class={twMerge("text-xs text-slate-300 dark:text-slate-500", className)}>
  {@render children()}
</p>
