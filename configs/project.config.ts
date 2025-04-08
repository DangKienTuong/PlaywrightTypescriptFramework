import { devices } from '@playwright/test';

export const PLAYWRIGHT_PROJECT_CONFIG = [
  {
    name: 'chromium',
    channel: 'chrome',
    testMatch: 'tests/tests-management/gui/**/*.spec.ts',
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width: 1920, height: 919 },
      launchOptions: {
        args: [
          '--start-maximized',
          '--disable-web-security',
          '--auth-server-allowlist="*"',
        ],
        slowMo: 0,
      },
    },
  },

  {
    name: 'firefox',
    testMatch: 'tests/tests-management/gui/**/*.spec.ts',
    use: {
      ...devices['Desktop Firefox'],
      viewport: { width: 1920, height: 919 },
      channel: 'firefox',
      launchOptions: {
        firefoxUserPrefs: {
          'browser.cache.disk.enable': false,
          'browser.cache.memory.enable': false,
          'auth-server-allowlist': "*"
        },
        args: ['--start-maximized'],
        slowMo: 0,
      }
    },
  },
  {
    name: 'apitests',
    testMatch: 'tests/tests-management/api/**/*.spec.ts',
    use: {
      proxy: {
        server: '127.0.0.1:3128'
      }
    }
  },
]