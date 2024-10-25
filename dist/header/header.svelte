<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  type Props = {
    class?: string;
    children: Snippet;
  };

  let { children, class: className }: Props = $props();
</script>

<p class={twMerge("flex flex-col gap-0", className)}>
  {@render children()}
</p>
