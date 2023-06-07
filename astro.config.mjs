import { defineConfig } from "astro/config";
import AstroPWA from "@vite-pwa/astro";
import lit from "@astrojs/lit";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://stefan-asandei.cf",
  integrations: [sitemap(), AstroPWA(), lit()],
  markdown: {
    shikiConfig: {
      theme: JSON.parse(
        fs.readFileSync("./public/themes/catppuccin-macho.json", "utf-8")
      ),
      langs: [],
      wrap: true,
    },
  },
});

// good themes: "rose-pine-moon", "material-palenight", "poimandres"
