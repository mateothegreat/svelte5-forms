<script lang="ts">
  import type { Snippet } from "svelte";
  type Props = {
    class?: string;
    children: Snippet;
  };
  const r = $props();
  const uid = $props.id();

  console.log("uid", uid, r);
</script>

{uid}
<!--
<div class={twMerge("flex flex-col gap-6", className)}>
</div> -->

<!-- {@render children?.()} -->
<svelte:options accessors={true} />
