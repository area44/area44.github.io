import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

const base = process.env.BASE || "/";

// https://vite.dev/config/
export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    ignorePatterns: [
      "*.min.*",
      "*.map",
      "**/public",
      "**/build",
      "**/dist",
      "**/out",
      "**/.github",
      "**/.next",
      "**/.astro",
      "**/.netlify",
    ],
    sortImports: {
      groups: [
        "type-import",
        ["value-builtin", "value-external"],
        "type-internal",
        "value-internal",
        ["type-parent", "type-sibling", "type-index"],
        ["value-parent", "value-sibling", "value-index"],
        "unknown",
      ],
    },
    sortTailwindcss: {
      stylesheet: "./src/index.css",
      attributes: ["class", "className"],
      functions: ["clsx", "cn", "cva", "tv"],
    },
  },
  lint: {
    plugins: [
      "typescript",
      "unicorn",
      "react",
      "react-perf",
      "import",
      "jsx-a11y",
      "node",
      "promise",
      "vitest",
      "vue",
    ],
    ignorePatterns: [
      "*.min.*",
      "*.map",
      "**/public",
      "**/build",
      "**/dist",
      "**/out",
      "**/.github",
      "**/.next",
      "**/.astro",
      "**/.netlify",
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
  },
});
