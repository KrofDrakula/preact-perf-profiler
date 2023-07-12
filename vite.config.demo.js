import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxImportSource: "preact",
  },
  build: {
    outDir: resolve(__dirname, "demo"),
    target: "esnext",
    emptyOutDir: true,
  },
  root: "./src/demo",
});
