<script lang="ts">
  import { ControlType, createForm, validators } from "@mateothegreat/svelte5-forms";
  import { random } from "../lib/helpers";
  import ReusableInput from "./reusable-input.svelte";

  const form = createForm({
    name: "custom-form"
  });

  form.add({
    name: "test-1",
    type: ControlType.text,
    validators: [validators.between(2000, 5000)],
    props: {
      foo: "barring"
    }
  });

  form.add({
    name: "test-2",
    type: ControlType.text,
    props: {
      foo: "bettering"
    }
  });

  setInterval(() => {
    form.controls.get("test-1").value = random(0, 10000);
  }, 100);
</script>

<div class="m-4 flex flex-col gap-4 rounded-[7px] border-2 border-indigo-700 p-2 text-[12px]">
  <h1>Demo Component</h1>
  <ReusableInput
    control={form.controls.get("test-1")}
    label="My Input Label"
    props={{ foo: "barring" }} />
</div>
