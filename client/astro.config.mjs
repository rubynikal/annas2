// @ts-check
import { defineConfig } from 'astro/config';
import deno from '@deno/astro-adapter';
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  adapter: deno(),
  integrations: [svelte(), mdx()],
});