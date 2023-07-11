import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
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

  plugins: [dts({ entryRoot: "src" })],
});
