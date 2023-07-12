import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  esbuild: {
    jsxImportSource: "preact",
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "PreactPerfProfiler",
      fileName: "index",
    },
    sourcemap: true,
    target: "esnext",
    emptyOutDir: true,
    reportCompressedSize: true,
    rollupOptions: {
      external: ["preact"],
    },
  },
  root: "./src/demo",
  plugins: [dts({ entryRoot: "src" })],
});
