# Playwright Automated Tests

This repository contains an automated test framework using [Playwright](https://playwright.dev/) with TypeScript. It is designed for Web, API, and Electron Apps, providing a stable and robust layer on top of Playwright with built-in utilities, linting, logging, reports, and more.

## 📂 Project Structure

```
PLAYWRIGHT_AUTOMATED_TESTS
│── configs/
│   ├── project.config.ts  # Playwright projects configuration file
│
│── docs/assets/           # Documentation assets
│
│── environments/          # Environment-specific configuration files
│   ├── dev.env
│   ├── prod.env
│   ├── sit.env
│   ├── staging.env
│
│── node_modules/          # Node.js dependencies
│
│── src/
│   ├── types/
│   │   ├── custom.d.ts  # Type definitions
│   ├── utilities/      # Helper functions, API requests, and UI utilities
│   │   ├── api/        # API helper functions
│   │   ├── common/     # Generic functions in Typescript
│   │   ├── reporter/   # Custom reporters such as logger and monocart config
│   │   ├── ui/         # UI automated test utilities
│
│── test-results/          # Stores test execution results
│
│── tests/
│   ├── data-management/    # data mapping helpers and models definition
│   ├── test-data/
│   │   ├── document-files/   # test data files
│   │   ├── user-data/        # user or credential data
│   ├── test-objects/
│   │   ├── api/              # Api Object model for API requests and responses
│   │   ├── gui/pageObjects/
│   │   │   ├── components/   # UI component objects
│   │   │   ├── pages/        # UI page objects
│   │   │   ├── pageFixture.ts    # Extend the baseTest from the test framework to include page objects
│   ├── tests-management/     # Test-cases definition
│   │   ├── api/              # API test-cases implementation in Playwright tests
│   │   ├── gui/              # GUI test-cases implementation in Playwright tests
│   │   ├── testPreparation/    # Preparation steps before Test run and end
│
│── .gitignore
│── eslint.config.mjs      # Linting configuration
│── package-lock.json
│── package.json           # Project dependencies
│── playwright.config.ts   # Playwright test configuration
│── tsconfig.json          # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Install [Node.js](https://nodejs.org/) (version 22.14.0 or later)
- Install [Playwright](https://playwright.dev/)

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd PLAYWRIGHT_AUTOMATED_TESTS
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Install Playwright browsers:
   ```sh
   npx playwright install
   ```

### Package Information for Playwright Automation Tests

Below section provides a summary of the installed packages and their versions for the Playwright Automation Tests project. The packages are categorized into **dependencies** and **devDependencies**.

The dependencies in this project cover the entire automation framework setup, ranging from test execution with Playwright to data management, HTTP requests, XML parsing, and logging. The development dependencies help ensure a consistent code quality and enable seamless TypeScript development and linting. 

This setup provides a solid foundation for scalable and maintainable Playwright automation tests.

#### Dependencies

These are the core packages required for the functioning of the Playwright Automation Tests framework.

| Package                       | Version    | Description                                                  |
|-------------------------------|------------|--------------------------------------------------------------|
| **@playwright/test**           | ^1.51.0    | Playwright's official test automation library.               |
| **@types/node**                | ^22.13.10  | TypeScript type definitions for Node.js.                    |
| **axios**                      | ^1.8.4     | Promise-based HTTP client for making requests.               |
| **dotenv**                     | ^16.4.7    | Loads environment variables from a `.env` file.              |
| **exceljs**                    | ^4.4.0     | A library to create and read Excel files (XLSX).              |
| **fast-xml-parser**            | ^5.1.0     | A fast and lightweight XML parser.                           |
| **https-proxy-agent**          | ^7.0.6     | An HTTP(s) proxy agent for Node.js.                          |
| **mammoth**                    | ^1.9.0     | Converts DOCX documents into HTML or plain text.             |
| **monocart-reporter**          | ^2.9.16    | Playwright test reporter for generating test reports.        |
| **tsconfig-paths**             | ^4.2.0     | A utility to load and resolve paths in TypeScript config files. |
| **tslib**                      | ^2.8.1     | Runtime library for TypeScript features like async/await.    |
| **winston**                    | ^3.17.0    | A versatile logging library for Node.js.                     |

#### Development Dependencies

These packages are used for development purposes, such as linting, compiling TypeScript, and supporting Playwright.

| Package                       | Version    | Description                                                  |
|-------------------------------|------------|--------------------------------------------------------------|
| **@eslint/js**                 | ^9.23.0    | ESLint configuration with the latest JavaScript rules.       |
| **eslint**                     | ^9.23.0    | A static code analysis tool for identifying problematic patterns in JavaScript. |
| **eslint-plugin-playwright**   | ^2.2.0     | ESLint plugin with rules for Playwright-based tests.         |
| **globals**                    | ^16.0.0    | Global variable definitions for various environments.        |
| **httpntlm**                   | ^1.8.13    | HTTP NTLM authentication for Node.js.                        |
| **jiti**                       | ^2.4.2     | A fast alternative to `ts-node` for running TypeScript in Node.js. |
| **ts-node**                    | ^10.9.2    | TypeScript execution engine for Node.js.                     |
| **typescript**                 | ^5.8.2     | TypeScript language support.                                |
| **typescript-eslint**          | ^8.28.0    | TypeScript plugin for ESLint that provides TypeScript support. |


## 📋 Implementation

### Page Object Model (POM) Implementation Guide
This section explains how to implement the Page Object Model (POM) in Playwright, providing a structured and reusable way to interact with web pages. The guide covers:

  1. Create page objects for your pages
  2. Define and implement the `pageFixture`
  3. Use the `pageFixture` in your test files

### 1. Create page objects for your pages
  Page objects represent specific sections or pages of your web application. Each page object should expose methods to interact with the UI elements and verify the expected behavior.

#### Example: LoginPage (Page Object)

  To create a page object, we define a class that encapsulates the interactions with a specific page, in this case, the login page.
  Create a file named `login.page.ts` (or a similar name) in your project (recommend to follow the framework structure: `tests/test-objects/gui/../pages/login.page.ts`).
  ```ts
  import * as pageActions from '@utilities/ui/page-actions';

  export default class LoginPage{
      private btnLoginBoschAccount = pageActions.getLocator('//div[contains(text(), "Login with Bosch Account")]');
      private inputEmail = pageActions.getLocator('//input[@type="email"]');
      private btnNext = pageActions.getLocator('//input[@value="Next"]');

      async openServiceDashboardPage(url: string){
          await pageActions.gotoURL(url);
      }
      
      async loginToDashboardByBoschAccount(username: string, storagePath?: string){
          await pageActions.click(this.btnLoginBoschAccount);
          await pageActions.fill(this.inputEmail,username);
          await pageActions.click(this.btnNext);
      }
  }
  ```
### 2. Define (if not yet have) and implement the `pageFixture`
  A Page Fixture is used to provide access to the Page Objects within your test setup. It is typically initialized before each test to ensure that page objects are created with a fresh instance of the page context.

  If you not yet define the `pageFixture`, then Create `pageFixture.ts` following the framework structure, e.g: `tests/test-objects/gui/pageFixture.ts`
  ```ts
    import { Page, test as baseTest } from '@playwright/test';
    import LoginPage from '@pageobjects/pages/login.page';
    import { setPage, createPageObject } from '@utilities/ui/page-factory';

    /**
    * This hook runs before each test, setting up the page context.
    * It initializes page objects before each test.
    */
    baseTest.beforeEach(({ page }: { page: Page }) => {
      setPage(page);  // Set up the page context for the test
    });

    // Define the structure for Page Objects
    export type PageObjects = {
      loginPage: LoginPage; // Add other page objects as needed
    };

    // Extend the baseTest with page objects
    export const test = baseTest.extend<PageObjects>({
      loginPage: createPageObject(LoginPage), // Initialize the loginPage object
    });

    // Export Playwright's core utilities for use in tests
    export { expect, Page, Locator, Response } from '@playwright/test';

  ```
  Explanation:
  - beforeEach Hook: This hook runs before each test to set up the page context.
  - PageObjects Type: Defines the structure of all the page objects that will be used in the tests
  - baseTest.extend: This method extends the baseTest object to include the page objects, making them available in the test setup.
  - createPageObject: us the Utility Function that helps to instantiate and manage page objects dynamically.

### 3. Use the `pageFixture` in your test files
Once you've defined the page fixture and created your page objects, you can use them in your test cases.

Example: login.spec.ts
  In your `tests/tests-management/gui/` folder, create a test file (e.g., login.spec.ts).
  ```ts
    import { test } from '@your-project/test-objects/gui/pageFixture';

    test('Login Test', async ({ loginPage }) => {
      // Use the loginPage object to perform login action
      await loginPage.login('user@example.com', 'password123');
      await loginPage.verifyLoginSuccess('Welcome User');
    });

  ```
  Explanation:
  - The test imports the test object from pageFixture.ts.
  - The loginPage object is passed as part of the test context.
  - Methods like login() and verifyLoginSuccess() can be used directly in the test.

### API Tests Implementation Guide
  This guide will walk you through creating an API model, helper functions for making requests, and using them in test specifications for Playwright. We'll cover creating the API model for the API, the helper to interact with the API, and how to write test cases to verify the behavior.

  1. [Create the API Model](#1-create-the-api-model)
  2. [Create the API Helper](#2-create-the-api-helper)
  3. [Use the API Helper in Test Specification](#3-use-the-api-helper-in-test-specification)
  4. [API Test Utilities Key Imports](#4-api-test-utilities-key-imports)

  ## 1. Create the API Model
  The API model represents the data structure we expect from the API response. In this case, we are creating a `User` model to define the structure of user data returned by the fake API.

  ### Example: User Model
  Create a new TypeScript file for the user model (e.g., `userModel.ts`).

  ```ts
    export interface User {
      id: number;
      name: string;
      email: string;
      address: string;
      zip: string;
      state: string;
      country: string;
      phone: string;
      photo: string;
  }
  ```
  Explanation: The User model defines the fields we expect to retrieve when fetching user data from the API. This will be used for type-checking the response.

  ## 2. Create the API Helper
  Next, create a helper class that abstracts the logic for making requests to the API. The helper should define methods to interact with the API and return data in the expected format.
    
  ### Example: Fake API Helper
  Create a new TypeScript file for the API helper (e.g., fakeApiHelper.ts).
    
  ```ts
      import { apiRequest, HttpMethod, RequestOptions } from '@utilities/api/api-helper';
      import { User } from '../models/userModel';
      import { ContentType } from '@utilities/api/content-types';

      export default class FakeApiHelper {
        // Method to fetch a user by ID
        async fetchUser(userId: number = 1): Promise<User> {
          const headers = {
            'Content-Type': ContentType.APPLICATION_JSON, 
          };

          const options: RequestOptions = {
            endpoint: `/users/${userId}`,
            method: HttpMethod.GET,
            headers: headers,
          };

          // Sending the API request and returning the response as a User object
          return (await apiRequest(options)).json();
        }
      }
  ```
  Explanation:
  - FakeApiHelper uses the apiRequest helper to send a GET request to the /users/{userId} endpoint.
  - The fetchUser method returns the API response parsed as a User object.

  ## 3. Use the API Helper in Test Specification
  Once the model and helper are set up, you can use them in your test specification. In Playwright, you write tests inside the test.describe block. You will instantiate the API helper, fetch the user data, and then verify the response using assertions.

  ### Example: Test Spec for Fake API Helper
  Create a new test specification file for the fake API helper (e.g., fakeApiHelper.spec.ts).

  ```ts
      import { test } from '@playwright/test';
      import { expect } from '@utilities/reporter/custom-expect';
      import { ConfigHelper } from '@utilities/api/api-config';
      import { createtApiContext } from '@utilities/api/api-helper';
      import FakeApiHelper from 'tests/test-objects/api/helpers/fakeApiHelper';
      import { User } from 'tests/test-objects/api/models/userModel';

      test.describe('Fake API Helper Tests', () => {

        let apiHelper: FakeApiHelper;

        test.beforeEach(async () => {
          const configHelper = new ConfigHelper();
          await createtApiContext(configHelper.getBaseUrl());
          apiHelper = new FakeApiHelper();
        });

        test('should fetch user data successfully', async () => {
          const userId = 1;
          const user: User = await apiHelper.fetchUser(userId);

          // Assertions to verify the user data
          expect(user).toBeDefined();
          expect(user.name).toBeDefined();
          expect(user.email).toBeDefined();
          expect(user.address).toBeDefined();
          expect(user.zip).toBeDefined();
          expect(user.state).toBeDefined();
          expect(user.country).toBeDefined();
          expect(user.phone).toBeDefined();
          expect(user.photo).toBeDefined();
          expect(user.id).toBe(2);
        });

      });
  ```
 ## 4. API Test Utilities Key Imports
 This document explains the purpose and usage of the following key imports used in Playwright test specifications:

- `expect` from `@utilities/reporter/custom-expect`
- `ConfigHelper` from `@utilities/api/api-config`
- Api utilities from `@utilities/api/api-helper`

These utilities help streamline testing, enable flexible API configurations, and enhance the testing process with custom assertions.

### `expect` from `@utilities/reporter/custom-expect`

  #### Purpose:
  The `expect` utility from `@utilities/reporter/custom-expect` provides custom matchers or enhanced assertions tailored for Playwright tests. This custom expectation module offers more flexible assertions, logging, and customized error handling compared to Playwright's built-in assertions.

  #### Usage:
  Instead of using the default `expect` from `@playwright/test`, the project uses a custom version imported from `@utilities/reporter/custom-expect`. This allows you to include additional custom matchers like `toBeDefined()`, `toHaveText()`, etc., and get better reporting and debugging capabilities.

  #### Example:

  ```ts
  import { expect } from '@utilities/reporter/custom-expect';

  // Example test
  test('should verify user details', async () => {
    const user = await apiHelper.fetchUser(1);

    // Using custom expectations
    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toContain('@example.com');
  });
  ```
### `ConfigHelper` from `@utilities/api/api-config`
  #### Purpose:
  `ConfigHelper` is a utility that aids in managing and retrieving configuration values for interacting with APIs. It abstracts the configuration logic and allows dynamic loading of environment variables, base URLs, authentication tokens, etc. This utility helps keep the test environment setup flexible and reusable.

  #### Usage:
  `ConfigHelper` allows you to fetch environment-specific configurations like API base URLs, authentication tokens, and other important configurations that can change based on the test environment (development, staging, production, etc.).

  #### Example:
  ```ts
    import { ConfigHelper } from '@utilities/api/api-config';

    // Example test setup
    test.beforeEach(async () => {
      const configHelper = new ConfigHelper();
      const baseUrl = configHelper.getBaseUrl();
      
      // Set the API base URL for the test context
      await createtApiContext(baseUrl);
    });

  ```
  Methods:
  - getBaseUrl(): Returns the base URL for the API depending on the environment configuration (dev, staging, production).
  - getApiKey(): Fetches the API key or token used for authentication.
  - getAuthHeader(): Retrieves the necessary authentication headers required for API requests.
  The ConfigHelper class ensures that configuration settings are centralized, reusable, and environment-specific.
### Api utilities from `@utilities/api/api-helper`

#### Purpose:
  `@utilities/api/api-helper` is a various utilities for handling API requests, responses, and context management in Playwright tests. These utilities provide an easy way to manage API requests, log details, handle headers, and perform other API-specific tasks, all while ensuring flexibility and maintainability.
  
  This utility package for handling API requests and responses in Playwright tests simplifies the process of managing API interactions. With a well-structured context management system, helper methods for adding headers and query parameters, and detailed logging for both requests and responses, this package helps you write cleaner and more maintainable API tests.
  
  By using these functions and utilities, you can:
  - Easily manage and configure API requests.
  - Log request and response details for better debugging.
  - Handle query parameters and request bodies in a flexible way.
  
  These utilities are designed to work seamlessly with Playwright's API capabilities, making them essential tools for API testing in your automated test suite.

## 🔍 Running Tests
To run the test, you need to define the run scripts in `package.json`
Hereunder is some example within pre-configured scripts. Depends on projects, it should be adapted.

### Run all tests
```sh
npm test
```

### Run tests in a specific browser
```sh
npm run test:chromium
npm run test:firefox
npm run test:msedge
```

### Run tests in headed mode
```sh
npm run test:chromium-headed
npm run test:firefox-headed
npm run test:msedge-headed
```

### Run UI tests with environment variables
```sh
npm run test:dev
npm run test:staging
npm run test:sit
npm run test:prod
```

### Run API tests
```sh
npm run test:api
```

### Debugging tests
```sh
npm run test:debug
```

## 📊 Test Reporting

- This project uses [Monocart Reporter](https://github.com/cenfun/monocart-reporter) for test reporting.
- After running tests, reports are generated in the `test-results/` directory.
- To view the Monocart HTML report, run:
  ```sh
  npx monocart show-report <path-to-report>
  ```

## 📌 Project Features

- **Framework**: Playwright with TypeScript
- **Test Types**:
  - UI Tests (GUI automation)
  - API Tests
  - Electron App Testing
- **Structure**:
  - `tests/`: Contains all related-tests sources
  - `tests/tests-management`: Contains all test-cases definition
  - `tests/test-objects/`: Contains all related Test objects
  - `tests/test-objects/api`: Api Object model for API requests and responses
  - `tests/test-objects/gui`: Page Object Model (POM) for UI interactions
  - `utilities/`: Helper functions, API requests, and UI utilities
  - `configs/`: Configuration files for tests and environments
  - `test-results/`: Stores test execution reports

## 🔍 Linting and Code Quality

Ensure your code follows best practices with ESLint:
```sh
npm run lint
```

## 📌 Contributing

- Follow the project's coding standards (`eslint.config.mjs`).
- Write tests inside the appropriate `tests/` directory.
- Use the `utilities/` directory for reusable functions.

## 🛠 Troubleshooting

- If tests are failing:
  - Ensure the correct environment variables are set.
  - Run Playwright with debugging enabled:
    ```sh
    npx playwright test --debug
    ```
  - Check Playwright dependencies:
    ```sh
    npx playwright install --with-deps
    ```

## 📜 License

This project is licensed under the MIT License.

