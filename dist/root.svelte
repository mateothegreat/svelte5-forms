<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";
  type Props = {
    label: string;
    description?: string;
    class?: string;
    children: Snippet;
  };

  let { children, class: className }: Props = $props();
</script>

<div class={twMerge("flex flex-col gap-0.5 px-[1px]", className)}>
  {@render children()}
</div>
