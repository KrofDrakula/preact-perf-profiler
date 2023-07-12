import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxImportSource: "preact",
  },
  build: {
    outDir: resolve(__dirname, "demo"),
    sourcemap: true,
    target: "esnext",
    emptyOutDir: true,
  },
  root: "./src/demo",
});
