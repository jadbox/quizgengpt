import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
// import react from "@astrojs/react"; // avoid using this for now

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    // react()
  ],
});
