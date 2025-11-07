/**
 * playwright.config.ts: This module is responsible for configuring the Playwright test runner.
 * It includes settings for test execution, browser configuration, and environment variables.
 * See https://playwright.dev/docs/test-configuration for more details.
 */

import { ACTION_TIMEOUT, EXPECT_TIMEOUT, NAVIGATION_TIMEOUT, TEST_TIMEOUT } from '@utilities/ui/timeout-const';
import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import { PLAYWRIGHT_PROJECT_CONFIG } from './configs/project.config';
import { WaitForLoadStateOptions } from '@utilities/ui/parameter-types';
import { MONOCART_CONFIG } from '@utilities/reporter/monocart-config';

switch (process.env.NODE_ENV) {
  case 'dev': dotenv.config({ path: './environments/dev.env' }); break;
  case 'staging': dotenv.config({ path: './environments/staging.env' }); break;
  case 'qa': dotenv.config({ path: './environments/qa.env' }); break;
  case 'sit': dotenv.config({ path: './environments/sit.env' }); break;
  case 'prod': dotenv.config({ path: './environments/production.env' }); break;
  default: dotenv.config({ path: './environments/dev.env' });
};

/**
 * Default load state to be used while loading a URL or performing a click and navigate operation.
 * The load state is set to 'domcontentloaded', which means the action will wait until the 'DOMContentLoaded' event is fired.
 */
export const LOADSTATE: WaitForLoadStateOptions = 'domcontentloaded';

export default defineConfig({
  testDir: './tests/tests-management',
  outputDir: './test-results/artifacts',
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  timeout: TEST_TIMEOUT,
  expect: {
    timeout: EXPECT_TIMEOUT,
  },
  metadata: {
    product: `Playwright Automated Test - ${process.env.PROJECT_NAME}`,
    url: `${process.env.BASE_URL}`,
    env: `${process.env.NODE_ENV}` || 'dev',
  },
  reporter: [
    ['./src/utilities/reporter/custom-logger.ts'],
    [`monocart-reporter`, MONOCART_CONFIG],
    ['list']
  ],
  use: {
    /* Records traces after each test failure for debugging purposes. */
    trace: 'off',
    screenshot: 'only-on-failure',
    /* Sets a timeout for actions like click, fill, select to prevent long-running operations. */
    actionTimeout: ACTION_TIMEOUT,
    /* Sets a timeout for page loading navigations like goto URL, go back, reload, waitForNavigation to prevent long page loads. */
    navigationTimeout: NAVIGATION_TIMEOUT,
    viewport: null,
    bypassCSP: true,
    launchOptions: {
      args: ["--start-maximized"]
    },
    ignoreHTTPSErrors: true,
    acceptDownloads: true
  },
  projects: PLAYWRIGHT_PROJECT_CONFIG
});
