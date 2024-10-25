<script lang="ts" generics="T">
  import { type Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { Control, createForm } from "./form.svelte";
  import type { FormInstance } from "./types";

  type Props<T> = {
    form: FormInstance<T>;
    valid?: boolean;
    controls: Control<T>[];
    class?: string;
    children: Snippet;
  };

  let { form = $bindable(), controls, children, class: className }: Props<T> = $props();

  form = createForm<T>(controls);
</script>

<div class={twMerge("flex flex-col gap-0.5 px-[1px]", className)}>
  {@render children()}
</div>
