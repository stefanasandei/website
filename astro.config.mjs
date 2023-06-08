import { defineConfig } from "astro/config";
import AstroPWA from "@vite-pwa/astro";
import lit from "@astrojs/lit";
import sitemap from "@astrojs/sitemap";
import { readFileSync } from "fs";

export default defineConfig({
  site: "https://stefan-asandei.netlify.app",
  integrations: [sitemap(), AstroPWA(), lit()],
  markdown: {
    shikiConfig: {
      theme: JSON.parse(
        readFileSync("./public/themes/catppuccin-macho.json", "utf-8")
      ),
      langs: [],
      wrap: true,
    },
  },
});

// good themes: "rose-pine-moon", "material-palenight", "poimandres"
