import { createRawSnippet } from "svelte";

export const greet = createRawSnippet((name) => {
  return {
    render: () => `
			<h1>Hello ${name()}!</h1>
		`,
    setup: (node) => {
      $effect(() => {
        node.textContent = `Hello ${name()}!`;
      });
    }
  };
});
