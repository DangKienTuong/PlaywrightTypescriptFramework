# Test Preparation for Playwright Automation Tests

## Introduction

The **Test Preparation** section defines all the necessary steps to set up the environment, data, and configurations required before running tests and also the teardown steps after tests are completed. These actions are critical to ensuring a clean and consistent testing environment.

This section will cover:

- Environment setup
- Browser and context initialization
- Test data setup
- Mocking API calls
- Clean-up operations after test execution

## Example Setup

### Global Setup

In this section, you can define global setup actions like configuring environment variables, authentication tokens, or other global settings.

```ts
test.beforeAll(async () => {
  // Set environment variables
  process.env.API_URL = 'https://api.example.com';
  console.log("Global setup complete.");
});
```
### Browser Setup

The browser setup ensures that each test runs in a fresh browser context. This is optional, since you could use `pageFixture.ts` which will support more effective for Page object Models (POM)

```ts
test.beforeEach(async ({ browser }) => {
  // Initialize a new browser context
  const context = await browser.newContext();
  const page = await context.newPage();
  console.log("Browser setup complete.");
  return { page, context };
});

```

## Example Teardown

### Browser Teardown

After each test, it is important to close the browser context to ensure a clean slate for the next test.
Also optional, only in-case you want to manage the Browser Context by yourself, else use Playwright in-build page context will be better, and it already has teardown browser automatically.

```ts
test.afterEach(async ({ context }) => {
  await context.close();
  console.log("Browser teardown complete.");
});

```

### Test Data Cleanup

This section ensures that any mock data or side effects created during the test are cleared out.

```ts
test.afterEach(async () => {
  // Reset any mock data or clear cookies
  await page.clearCookies();
  console.log("Test data cleanup complete.");
});


```

## Further Actions

You can define additional steps for your environment and data setup/cleanup to suit the needs of your specific project.


