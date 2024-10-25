<script lang="ts" generics="T">
  import { onMount, type Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { Control, createForm } from "./form.svelte";
  import type { FormInstance } from "./types";

  type Props<T> = {
    form: FormInstance<T>;
    controls: Control<T>[];
    class?: string;
    children: Snippet;
  };

  let { form = $bindable(), controls, children, class: className }: Props<T> = $props();

  form = createForm<T>(controls);

  onMount(() => {
    console.log(form);
    console.log(controls);
  });
</script>

<div class={twMerge("flex flex-col gap-0.5 px-[1px]", className)}>
  {@render children()}
</div>
