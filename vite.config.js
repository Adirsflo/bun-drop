import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Added path to images for easier access
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@images": resolve(__dirname, "src/images"),
    },
  },
});
