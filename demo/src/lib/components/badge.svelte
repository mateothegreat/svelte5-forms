<script lang="ts">
  import type { Snippet } from "svelte";
  import { variant as _variant, variants } from "./badge";

  let {
    icon,
    text,
    variant,
    children,
    class: className
  }: {
    icon?: any;
    text?: string;
    variant?: _variant;
    children?: Snippet;
    class?: string;
  } = $props();

  let Icon = variants[variant]?.icon;
</script>

<div class="inline-flex items-center justify-center rounded-[4px] px-2 py-0.5 {variants[variant]?.classes || className}">
  {#if icon}
    <Icon class="inline-block h-5 w-5" />
  {/if}
  {text}
  {@render children?.()}
</div>
