import { vitePreprocess } from "@astrojs/svelte";
import { preprocess } from "svelte/compiler";

export default {
    preprocess: vitePreprocess()
}