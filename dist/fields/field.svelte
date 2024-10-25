<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";
  type Props = {
    class?: string;
    children: Snippet;
  };

  let { children, class: className }: Props = $props();
</script>

<div class={twMerge("flex w-full flex-col gap-1.5 px-[1px]", className)}>
  {@render children()}
</div>
