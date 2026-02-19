// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["line"], ["html", { open: "never" }], ["allure-playwright"]],

  projects: [
    {
      name: "chromium-ui",
      testMatch: "**/ui.spec.js",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.UI_BASE_URL || "https://realworld.qa.guru/#/",
      },
    },
    {
      name: "chromium-api",
      testMatch: "**/airport-api.spec.js",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.API_BASE_URL || "https://airportgap.com/api",
      },
    },
  ],
});
