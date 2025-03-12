import { svelte } from "@sveltejs/vite-plugin-svelte";

import tailwindcss from "@tailwindcss/vite";

import path from "path";

import { defineConfig } from "vite";

export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, "../src"),
      "@mateothegreat/svelte5-forms": path.resolve(__dirname, "../src")
    }
  }
});
