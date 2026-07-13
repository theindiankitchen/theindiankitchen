// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Static output for SEO and static hosting. Update `site` to the production
// domain so the sitemap and canonical URLs resolve correctly.
export default defineConfig({
  site: "https://www.theindiankitchen.ca",
  output: "static",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
