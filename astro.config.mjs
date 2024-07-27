import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
// import react from "@astrojs/react"; // avoid using this for now
import bun from "astro-bun-adapter";
// https://astro.build/config
export default defineConfig({
  site: "https://app.thrivetogether.ai",
  output: "server",
  adapter: bun(),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    // react()
  ],
});
