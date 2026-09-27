import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "https://scarlet-twinz.github.io/ACCESS/",
    trace: "on-first-retry",
    ...devices["Desktop Chrome"],
  },
  reporter: [["list"], ["html", { open: "never" }]],
});
