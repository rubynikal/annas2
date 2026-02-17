// @ts-check
import { defineConfig } from 'astro/config';
import { deno } from'deno-adapter';

// https://astro.build/config
export default defineConfig({
    adapter: deno(),
});
