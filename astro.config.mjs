import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
// import react from "@astrojs/react"; // avoid using this for now
// import bun from "@nurodev/astro-bun";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import simpleStackQuery from "simple-stack-query";

// https://astro.build/config
export default defineConfig({
  // host: true,
  site: "https://app.thrivetogether.ai",
  output: "server",
  adapter: node({
    host: true,
    mode: "standalone",
  }),
  server: {
    host: true,
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    // react()
    simpleStackQuery(),
  ],
  experimental: {
    serverIslands: true,
  },
});
