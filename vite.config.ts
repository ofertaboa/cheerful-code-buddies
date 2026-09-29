// @lovable.dev/vite-tanstack-config already includes these plugins.
// Keep the wrapper so the existing Lovable/TanStack setup remains intact.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // GitHub Pages serves this repository under /cheerful-code-buddies/.
  vite: {
    base: "/cheerful-code-buddies/",
  },
  tanstackStart: {
    // Generate static HTML for the routes that GitHub Pages can serve.
    prerender: {
      enabled: true,
      routes: ["/"],
      crawlLinks: false,
      failOnError: true,
    },
    // Existing SSR server entry, retained for compatibility with the current setup.
    server: { entry: "server" },
  },
});
