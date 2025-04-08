/**
 * page-factory.ts: This module is responsible for setting and managing instances of pages.
 * It provides a centralized way to set and access pages, ensuring that each test has a clean, isolated page instance.
 * This helps to maintain the state and context of each test independently, improving test reliability and debugging.
 * It also includes functions for switching between pages, closing pages, and reverting to the default page.
 */

import { SMALL_TIMEOUT } from './timeout-const';
import { Page } from '@playwright/test';

let page: Page;

/**
 * Returns the current Page.
 * @returns {Page} The current Page.
 */
export function getPage(): Page {
  return page;
}

/**
 * Sets the current Page.
 * @param {Page} pageInstance - The Page instance to set as the current Page.
 */
export function setPage(pageInstance: Page): void {
  page = pageInstance;
}

/**
 * Switches to a different page by its index (1-based).
 * If the desired page isn't immediately available, this function will wait and retry for up to 'SMALL_TIMEOUT' seconds.
 * @param {number} winNum - The index of the page to switch to.
 * @throws {Error} If the desired page isn't found within 'SMALL_TIMEOUT' seconds.
 */
export async function switchPage(winNum: number): Promise<void> {
  const startTime = Date.now();
  while (page.context().pages().length < winNum && Date.now() - startTime < SMALL_TIMEOUT) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  if (page.context().pages().length < winNum) {
    throw new Error(`Page number ${winNum} not found after ${SMALL_TIMEOUT} seconds`);
  }
  const pageInstance = page.context().pages()[winNum - 1];
  await pageInstance.waitForLoadState();
  setPage(pageInstance);
}

/**
 * Switches back to the default page (the first one).
 */
export async function switchToDefaultPage(): Promise<void> {
  const pageInstance = page.context().pages()[0];
  if (pageInstance) {
    await pageInstance.bringToFront();
    setPage(pageInstance);
  }
}

/**
 * Closes a page by its index (1-based).
 * If no index is provided, the current page is closed.
 * If there are other pages open, it will switch back to the default page.
 * @param {number} winNum - The index of the page to close.
 */
export async function closePage(winNum: number): Promise<void> {
  if (!winNum) {
    await page.close();
    return;
  }
  const noOfWindows = page.context().pages().length;
  const pageInstance = page.context().pages()[winNum - 1];
  await pageInstance.close();
  if (noOfWindows > 1) {
    await switchToDefaultPage();
  }
}

// `createPageObject` is a generic function that helps create and initialize a page object
// for a given page class. It accepts a `PageClass`, which is a constructor function for the page object,
// and returns a function that interacts with a page instance in the context of a test.
export const createPageObject = <T>(PageClass: new () => T) =>
  // The returned function accepts an object with a `page` property and a `use` function.
  // `page` represents the page instance in the test, and `use` is a callback function that is invoked
  // with the created page object (of type `T`).
  async ({ }: { page: Page }, use: (obj: T) => void) => {

    // Create an instance of the `PageClass` by calling its constructor.
    // `PageClass` is a class type, so this creates a new instance of it.
    const pageObject = new PageClass();

    // The `pageObject` is passed to the `use` function, which is a callback provided by the test framework.
    // The `use` function is typically used to pass the page object instance to the test context.
    // It ensures that the test has access to the page object for interacting with the page.
    use(pageObject);
  };