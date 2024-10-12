/// <reference types="vitest">
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Set the testing environment to jsdom
    globals: true,
    setupFiles: "./vitest.setup.ts", // Path to setup file
    include: ["src/**/*.test.{js,ts,jsx,tsx}"], // Include your test files
  },
});
