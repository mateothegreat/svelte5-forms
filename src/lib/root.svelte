<script lang="ts">
  import { type Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { createContext } from "./context";
  import { Control, createForm } from "./form.svelte";
  import type { FormInstance } from "./types";

  type Props = {
    form: FormInstance<any>;
    valid?: boolean;
    controls: Control<any>[];
    class?: string;
    children: Snippet;
  };

  let { form = $bindable(), controls, children, class: className }: Props = $props();

  const ctx = createContext(createForm<any>(controls));
  form = ctx.form;
  console.log("form", form);
</script>

{ctx.form}

<div class={twMerge("flex flex-col gap-0.5 px-[1px]", className)}>
  {@render children()}
</div>
