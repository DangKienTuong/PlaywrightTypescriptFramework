import { Page, test as baseTest } from '@playwright/test';
import PrivacySettingsDialog from "@pageobjects/components/dialogPrivacySettings";
import LoginPage from "@pageobjects/pages/login.page";
import AppHeaders from "@pageobjects/components/appHeaders";
import AppNavigationBar from "@pageobjects/components/appNavigation";
import DocumentUploadPage from "@pageobjects/pages/documentUpload.page";
import DocumentSearchPage from "@pageobjects/pages/documentSearch.page";
import { setPage, createPageObject } from '@utilities/ui/page-factory';
import UserGroupPage from '@pageobjects/pages/userGroup.page';


/**
 * A hook that runs before each test, setting the page context.
 * @param {Page} page - The page context provided by Playwright.
 */
baseTest.beforeEach(({ page }: { page: Page }) => {
  setPage(page);
});

// Define a TypeScript type `PageObjects` that describes the structure of various page objects.
export type PageObjects = {
  compDialogPrivacySettings: PrivacySettingsDialog;
  loginPage: LoginPage;
  appHeader: AppHeaders;
  appNavBar: AppNavigationBar;
  documentUploadPage: DocumentUploadPage;
  documentSearchPage: DocumentSearchPage;
  userGroupPage: UserGroupPage;
};

// Extend the baseTest from the test framework to include page objects.
// The baseTest object is extended to ensure these page objects are available in the test setup.
export const test = baseTest.extend<PageObjects>({
  // For each page object, call `createPageObject` to create a new instance of that page class.
  // This ensures that each page object can be used in the tests with the proper setup.

  compDialogPrivacySettings: createPageObject(PrivacySettingsDialog),
  appHeader: createPageObject(AppHeaders),
  loginPage: createPageObject(LoginPage),
  appNavBar: createPageObject(AppNavigationBar),
  documentUploadPage: createPageObject(DocumentUploadPage),
  documentSearchPage: createPageObject(DocumentSearchPage),
  userGroupPage: createPageObject(UserGroupPage),
});

export { expect, Page, Locator, Response } from "@playwright/test";
