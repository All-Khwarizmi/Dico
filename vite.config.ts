import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    name: "Dico",
    root: "src",
    environment: "happy-dom",
    testTimeout: 25000,
  },
  resolve: {
    alias: {
      "@": new URL("src", import.meta.url).pathname,
    },
  },
});
