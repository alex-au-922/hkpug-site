// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "static",
  build: {
    format: "directory",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react({
      experimentalReactChildren: true,
    }),
  ],
  site: "https://alex-au-922.github.io",
  base: "/hkpug-site",
});
