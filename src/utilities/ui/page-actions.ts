/**
 * page-actions.ts: This module provides a set of utility functions for performing various actions in Playwright tests.
 * These actions include navigation, interaction with page elements, handling of dialogs, and more.
 */
import { Dialog, FrameLocator, Locator, Response, selectors } from '@playwright/test';
import { getPage } from './page-factory';
import {
  CheckOptions,
  ClearOptions,
  ClickOptions,
  DoubleClickOptions,
  DragOptions,
  FillOptions,
  GotoOptions,
  HoverOptions,
  NavigationOptions,
  SelectOptions,
  TimeoutOption,
  UploadOptions,
  UploadValues,
  WaitForLoadStateOptions,
  GetByPlaceholderOptions,
  GetByRoleOptions,
  GetByRoleTypes,
  GetByTextOptions,
  LocatorOptions
} from './parameter-types';
import { INSTANT_TIMEOUT, SMALL_TIMEOUT } from './timeout-const';
import { logger } from '@utilities/reporter/custom-logger';
import { ErrorHandler } from '@utilities/reporter/error-handler';

const errorHandler = new ErrorHandler();

/**
 * 0. Common: This section contains functions and definition relate to all common function that would using with page object
 */
/**
 * Waits for a given timeout in milliseconds.
 * This function uses the Playwright waitForTimeout method and handles potential errors.
 * @param timeout - The time to wait in milliseconds.
 * @returns {Promise<void>} - No return value, it just waits.
 */
export async function waitForSomeTime(timeout: number): Promise<void> {
  try {
    errorHandler.checkNotEmpty(timeout, 'Timeout'); // Check if the timeout is provided
    await getPage().waitForTimeout(timeout);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error waiting for timeout');
  }
};

/**
 * Returns a Locator object based on the input provided.
 * This function handles invalid inputs (both string and Locator types).
 * @param input - The input to create the Locator from, either a string or an existing Locator.
 * @param options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocator(input: string | Locator, options?: LocatorOptions): Locator {
  try {
    errorHandler.checkNotEmpty(input, 'Input for Locator'); // Ensure the input is provided
    return typeof input === 'string' ? getPage().locator(input, options) : input;
  } catch (error) {
    throw errorHandler.handleError(error, 'Error getting Locator');
    // Ensure we throw the error to handle it upstream
  }
};

/**
 * Returns a Locator object with a specific testId.
 * Optionally accepts an attribute name to override the default 'testId' value.
 * @param testId - The testId to create the Locator from, either a string or RegExp.
 * @param attributeName - Optional attribute name for the testId.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorByTestId(testId: string | RegExp, attributeName?: string): Locator {
  try {
    errorHandler.checkNotEmpty(testId, 'TestId'); // Ensure the testId is provided
    if (attributeName) {
      selectors.setTestIdAttribute(attributeName);
    }
    return getPage().getByTestId(testId);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error getting Locator by TestId');

  }
};

/**
 * Returns a Locator object with a specific text.
 * @param text - The text to create the Locator from, either a string or RegExp.
 * @param options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorByText(text: string | RegExp, options?: GetByTextOptions): Locator {
  try {
    errorHandler.checkNotEmpty(text, 'Text for Locator'); // Ensure the text is provided
    return getPage().getByText(text, options);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error getting Locator by Text');

  }
};

/**
 * Returns a Locator object with a specific role.
 * @param role - The role to create the Locator from.
 * @param options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorByRole(role: GetByRoleTypes, options?: GetByRoleOptions): Locator {
  try {
    errorHandler.checkNotEmpty(role, 'Role for Locator'); // Ensure the role is provided
    return getPage().getByRole(role, options);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error getting Locator by Role');

  }
};

/**
 * Returns a Locator object with a specific label.
 * @param text - The label text to create the Locator from, either a string or RegExp.
 * @param options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorByLabel(text: string | RegExp, options?: GetByRoleOptions): Locator {
  try {
    errorHandler.checkNotEmpty(text, 'Label for Locator'); // Ensure the label is provided
    return getPage().getByLabel(text, options);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error getting Locator by Label');

  }
};

/**
 * Returns a Locator object with a specific title attribute.
 * @param text - The title text to create the Locator from, either a string or RegExp.
 * @param options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorByTitle(text: string | RegExp, options?: GetByRoleOptions): Locator {
  try {
    errorHandler.checkNotEmpty(text, 'Title for Locator'); // Ensure the title is provided
    return getPage().getByTitle(text, options);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error getting Locator by Title');

  }
};

/**
 * Returns a Locator object with a specific placeholder.
 * @param text - The placeholder text to create the Locator from, either a string or RegExp.
 * @param options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorByPlaceholder(text: string | RegExp, options?: GetByPlaceholderOptions): Locator {
  try {
    errorHandler.checkNotEmpty(text, 'Placeholder for Locator'); // Ensure the placeholder is provided
    return getPage().getByPlaceholder(text, options);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error getting Locator by Placeholder');

  }
};

/**
 * Returns all Locator objects based on the input provided.
 * This function returns an array of Locator objects that match the input criteria.
 * @param input - The input to create the Locators from, either a string or an existing Locator.
 * @param options - Optional parameters for the Locators.
 * @returns {Promise<Locator[]>} - The created Locator objects.
 */
export async function getAllLocators(input: string | Locator, options?: LocatorOptions): Promise<Locator[]> {
  try {
    errorHandler.checkNotEmpty(input, 'Input for Locators'); // Ensure the input is provided
    return typeof input === 'string' ? await getPage().locator(input, options).all() : await input.all();
  } catch (error) {
    throw errorHandler.handleError(error, 'Error getting all Locators');

  }
};

/**
 * Returns a FrameLocator object based on the input provided.
 * @param frameInput - The input to create the FrameLocator from, either a string or an existing FrameLocator.
 * @returns {FrameLocator} - The created FrameLocator object.
 */
export function getFrameLocator(frameInput: string | FrameLocator): FrameLocator {
  try {
    errorHandler.checkNotEmpty(frameInput, 'Frame Input'); // Ensure the frame input is provided
    return typeof frameInput === 'string' ? getPage().frameLocator(frameInput) : frameInput;
  } catch (error) {
    throw errorHandler.handleError(error, 'Error getting FrameLocator');

  }
};

/**
 * Returns a Locator object within a specific frame based on the input provided.
 * @param frameInput - The input to create the FrameLocator from, either a string or an existing FrameLocator.
 * @param input - The input to create the Locator from, either a string or an existing Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorInFrame(frameInput: string | FrameLocator, input: string | Locator): Locator {
  try {
    errorHandler.checkNotEmpty(frameInput, 'Frame Input'); // Ensure the frame input is provided
    errorHandler.checkNotEmpty(input, 'Locator Input'); // Ensure the locator input is provided
    return getFrameLocator(frameInput).locator(input);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error getting Locator in Frame');

  }
};

/**
 * 3. Navigations: This section contains functions for navigating within a web page or between web pages.
 * These functions include going to a URL, waiting for a page to load, reloading a page, and going back to a previous page.
 */

/**
 * Navigates to the specified URL.
 * Handles errors related to navigation failures.
 * @param path - The URL to navigate to.
 * @param options - The navigation options. Defaults to `{ waitUntil: LOADSTATE }`.
 * @returns {Promise<null | Response>} - The navigation response or null if no response.
 */
export async function gotoURL(path: string, options: GotoOptions = { waitUntil: 'load' }): Promise<null | Response> {
  try {
    errorHandler.checkNotEmpty(path, 'Path for navigation'); // Ensure path is provided
    logger.info(`Navigating to page URL: ${path}`);
    const response = await getPage().goto(path, options);
    return response;
  } catch (error) {
    throw errorHandler.handleError(error, 'Error navigating to URL');

  }
};

/**
 * Waits for a specific page load state.
 * Handles errors related to load state waiting failures.
 * @param options - The navigation options to customize waiting conditions.
 * @returns {Promise<void>} - No return value, it just waits.
 */
export async function waitForPageLoadState(options?: NavigationOptions): Promise<void> {
  try {
    let waitUntil: WaitForLoadStateOptions = 'load'; // Default load state

    if (options?.waitUntil && options.waitUntil !== 'commit') {
      waitUntil = options.waitUntil; // Override default if specified in options
    }

    await getPage().waitForLoadState(waitUntil);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error waiting for page load state');

  }
};

/**
 * Reloads the current page.
 * Waits for the page to be reloaded and waits for a load state.
 * @param options - The navigation options to customize the reload.
 * @returns {Promise<void>} - No return value, it just reloads the page.
 */
export async function reloadPage(options?: NavigationOptions): Promise<void> {
  try {
    await Promise.all([getPage().reload(options), getPage().waitForEvent('framenavigated')]);
    logger.info(`Reloaded the current page`);
    await waitForPageLoadState(options); // Wait for the page to load after reload
  } catch (error) {
    throw errorHandler.handleError(error, 'Error reloading the page');

  }
};

/**
 * Navigates back to the previous page.
 * Waits for the page to navigate back and waits for a load state.
 * @param options - The navigation options to customize the goBack action.
 * @returns {Promise<void>} - No return value, it just navigates back.
 */
export async function goBack(options?: NavigationOptions): Promise<void> {
  try {
    await Promise.all([getPage().goBack(options), getPage().waitForEvent('framenavigated')]);
    logger.info(`Navigated back to the previous page`);
    await waitForPageLoadState(options); // Wait for the page to load after navigating back
  } catch (error) {
    throw errorHandler.handleError(error, 'Error navigating back');

  }
};

/**
 * 4. Web Actions: This section contains functions for interacting with elements on a web page.
 * These functions include clicking, filling input fields, typing, clearing input fields, checking and unchecking checkboxes, selecting options in dropdowns, and more.
 */

/**
 * Clicks on a specified element.
 * @param {string | Locator} input - The element to click on.
 * @param {ClickOptions} options - The click options.
 * @returns {Promise<void>} - No return value, it just clicks the element.
 */
export async function click(input: string | Locator, options?: ClickOptions): Promise<void> {
  try {
    const locator = getLocator(input);
    await locator.click(options);
    logger.info(`Successfully clicked on element with locator: ${locator}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error clicking element');

  }
};

/**
 * Clicks on a specified element and waits for navigation.
 * @param {string | Locator} input - The element to click on.
 * @param {ClickOptions} options - The click options.
 * @returns {Promise<void>} - No return value, it waits for navigation after clicking.
 */
export async function clickAndNavigate(input: string | Locator, options?: ClickOptions): Promise<void> {
  try {
    const timeout = options?.timeout || 30000; // Set default timeout
    await Promise.all([click(input, options), getPage().waitForEvent('framenavigated', { timeout: timeout })]);
    logger.info(`Successfully clicked on element with locator: ${input}.\nWaiting for page navigation and loading`);
    await getPage().waitForLoadState(options?.loadState || 'load', {
      timeout: timeout,
    });
  } catch (error) {
    throw errorHandler.handleError(error, 'Error clicking element and navigating');

  }
};

/**
 * Fills a specified element with a value.
 * @param {string | Locator} input - The element to fill.
 * @param {string} value - The value to fill the element with.
 * @param {FillOptions} options - The fill options.
 * @returns {Promise<void>} - No return value, it just fills the element.
 */
export async function fill(input: string | Locator, value: string, options?: FillOptions): Promise<void> {
  try {
    const locator = getLocator(input);
    await locator.fill(value, options);
    logger.info(`Successfully filled value ${value} to element with locator: ${locator}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error filling element');

  }
};

/**
 * Fills a specified element with a value and press Enter.
 * @param {string | Locator} input - The element to fill.
 * @param {string} value - The value to fill the element with.
 * @param {FillOptions} options - The fill options.
 * @returns {Promise<void>} - No return value, it just fills the element and presses Enter.
 */
export async function fillAndEnter(input: string | Locator, value: string, options?: FillOptions): Promise<void> {
  try {
    const locator = getLocator(input);
    await locator.fill(value, options);
    logger.info(`Successfully filled value ${value} to element with locator: ${locator}`);
    await locator.press('Enter');
    logger.info(`Pressed Enter`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error filling element and pressing Enter');

  }
};

/**
 * Clears the value of a specified element.
 * @param {string | Locator} input - The element to clear.
 * @param {ClearOptions} options - The clear options.
 * @returns {Promise<void>} - No return value, it just clears the element.
 */
export async function clear(input: string | Locator, options?: ClearOptions): Promise<void> {
  try {
    const locator = getLocator(input);
    await locator.clear(options);
    logger.info(`Cleared value from element with locator: ${locator}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error clearing element');

  }
};

/**
 * Checks a specified checkbox or radio button.
 * @param {string | Locator} input - The checkbox or radio button to check.
 * @param {CheckOptions} options - The check options.
 * @returns {Promise<void>} - No return value, it just checks the checkbox/radio button.
 */
export async function check(input: string | Locator, options?: CheckOptions): Promise<void> {
  try {
    const locator = getLocator(input);
    await locator.check(options);
    logger.info(`Successfully checked option on: ${locator}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error checking checkbox/radio button');

  }
};

/**
 * Unchecks a specified checkbox or radio button.
 * @param {string | Locator} input - The checkbox or radio button to uncheck.
 * @param {CheckOptions} options - The uncheck options.
 * @returns {Promise<void>} - No return value, it just unchecks the checkbox/radio button.
 */
export async function uncheck(input: string | Locator, options?: CheckOptions): Promise<void> {
  try {
    const locator = getLocator(input);
    await locator.uncheck(options);
    logger.info(`Successfully unchecked option on: ${locator}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error unchecking checkbox/radio button');

  }
};

/**
 * Selects an option in a dropdown by its value.
 * @param {string | Locator} input - The dropdown to select an option in.
 * @param {string} value - The value of the option to select.
 * @param {SelectOptions} options - The select options.
 * @returns {Promise<void>} - No return value, it just selects the option by value.
 */
export async function selectByValue(input: string | Locator, value: string, options?: SelectOptions): Promise<void> {
  try {
    const locator = getLocator(input);
    await locator.selectOption({ value: value }, options);
    logger.info(`Successfully selected option with value ${value} on: ${locator}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error selecting option by value');

  }
};

/**
 * Selects options in a dropdown by their values (multi select).
 * @param {string | Locator} input - The dropdown to select options in.
 * @param {Array<string>} value - The values of the options to select.
 * @param {SelectOptions} options - The select options.
 * @returns {Promise<void>} - No return value, it just selects the options.
 */
export async function selectByValues(
  input: string | Locator,
  value: Array<string>,
  options?: SelectOptions,
): Promise<void> {
  try {
    const locator = getLocator(input);
    await locator.selectOption(value, options);
    logger.info(`Successfully selected options with values ${value} on: ${locator}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error selecting options by values');

  }
};

/**
 * Selects an option in a dropdown by its text.
 * @param {string | Locator} input - The dropdown to select an option in.
 * @param {string} text - The text of the option to select.
 * @param {SelectOptions} options - The select options.
 * @returns {Promise<void>} - No return value, it just selects the option by text.
 */
export async function selectByText(input: string | Locator, text: string, options?: SelectOptions): Promise<void> {
  try {
    const locator = getLocator(input);
    await locator.selectOption({ label: text }, options);
    logger.info(`Successfully selected option with text ${text} on: ${locator}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error selecting option by text');

  }
};

/**
 * Selects an option in a dropdown by its index.
 * @param {string | Locator} input - The dropdown to select an option in.
 * @param {number} index - The index of the option to select.
 * @param {SelectOptions} options - The select options.
 * @returns {Promise<void>} - No return value, it just selects the option by index.
 */
export async function selectByIndex(input: string | Locator, index: number, options?: SelectOptions): Promise<void> {
  try {
    const locator = getLocator(input);
    await locator.selectOption({ index: index }, options);
    logger.info(`Successfully selected option with index ${index} on: ${locator}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error selecting option by index');

  }
};

/**
 * 5. Alerts: This section contains functions for handling alert dialogs.
 * These functions include accepting and dismissing alerts, and getting the text of an alert.
 * Note: These functions currently have some repetition and could be optimized by applying the DRY (Don't Repeat Yourself) principle.
 */

/**
 * Accepts an alert dialog.
 * @param {string} promptText - The text to enter into a prompt dialog.
 * @returns {Promise<string>} - The message of the dialog.
 */
export async function acceptAlert(promptText?: string): Promise<string> {
  let dialogMessage = '';
  try {
    getPage().once('dialog', dialog => {
      dialogMessage = dialog.message();
      dialog.accept(promptText).catch(e => console.error('Error accepting dialog:', e));
    });
    logger.info(`Get alert message and Accepted Alert. Current alert message: ${dialogMessage}`);
    return dialogMessage;
  } catch (error) {
    throw errorHandler.handleError(error, 'Error accepting alert');

  }
};

/**
 * Dismisses an alert dialog.
 * @returns {Promise<string>} - The message of the dialog.
 */
export async function dismissAlert(): Promise<string> {
  let dialogMessage = '';
  try {
    getPage().once('dialog', dialog => {
      dialogMessage = dialog.message();
      dialog.dismiss().catch(e => console.error('Error dismissing dialog:', e));
    });
    logger.info(`Get alert message and Dismissed Alert. Current alert message: ${dialogMessage}`);
    return dialogMessage;
  } catch (error) {
    throw errorHandler.handleError(error, 'Error dismissing alert');

  }
};

/**
 * Gets the text of an alert dialog.
 * @returns {Promise<string>} - The message of the dialog.
 */
export async function getAlertText(): Promise<string> {
  let dialogMessage = '';
  try {
    const dialogHandler = (dialog: Dialog) => {
      dialogMessage = dialog.message();
    };
    getPage().once('dialog', dialogHandler);
    await getPage().waitForEvent('dialog');
    getPage().off('dialog', dialogHandler);
    logger.info(`Successfully got message from alert. Current alert message: ${dialogMessage}`);
    return dialogMessage;
  } catch (error) {
    throw errorHandler.handleError(error, 'Error getting alert text');

  }
};

/**
 * Hovers over a specified element.
 * @param {string | Locator} input - The element to hover over.
 * @param {HoverOptions} options - The hover options.
 * @returns {Promise<void>} - No return value, just hovers on the element.
 */
export async function hover(input: string | Locator, options?: HoverOptions): Promise<void> {
  try {
    const locator = getLocator(input);
    await locator.hover(options);
    logger.info(`Successfully hovered on: ${locator}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error hovering over element');

  }
};

/**
 * Focuses on a specified element.
 * @param {string | Locator} input - The element to focus on.
 * @param {TimeoutOption} options - The timeout options.
 * @returns {Promise<void>} - No return value, just focuses on the element.
 */
export async function focus(input: string | Locator, options?: TimeoutOption): Promise<void> {
  try {
    const locator = getLocator(input);
    await locator.focus(options);
    logger.info(`Successfully set focus on: ${locator}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error focusing on element');

  }
};

/**
 * Drags and drops a specified element to a destination.
 * @param {string | Locator} input - The element to drag.
 * @param {string | Locator} dest - The destination to drop the element at.
 * @param {DragOptions} options - The drag options.
 * @returns {Promise<void>} - No return value, just drags and drops the element.
 */
export async function dragAndDrop(
  input: string | Locator,
  dest: string | Locator,
  options?: DragOptions,
): Promise<void> {
  try {
    const drag = getLocator(input);
    const drop = getLocator(dest);
    await drag.dragTo(drop, options);
    logger.info(`Dragged ${drag} to ${drop}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error dragging and dropping element');

  }
};

/**
 * Double clicks on a specified element.
 * @param {string | Locator} input - The element to double-click on.
 * @param {DoubleClickOptions} options - The double-click options.
 * @returns {Promise<void>} - No return value, just double-clicks the element.
 */
export async function doubleClick(input: string | Locator, options?: DoubleClickOptions): Promise<void> {
  try {
    const locator = getLocator(input);
    await locator.dblclick(options);
    logger.info(`Successfully double-clicked on ${locator}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error double-clicking element');

  }
};

/**
 * Downloads a file from a specified element.
 * @param {string | Locator} input - The element to download the file from.
 * @param {string} path - The path to save the downloaded file to.
 * @returns {Promise<void>} - No return value, it downloads the file to the specified path.
 */
export async function downloadFile(input: string | Locator, path: string): Promise<void> {
  try {
    const locator = getLocator(input);
    const downloadPromise = getPage().waitForEvent('download');
    await click(locator);
    const download = await downloadPromise;
    // Wait for the download process to complete
    console.log(await download.path());
    // Save downloaded file somewhere
    await download.saveAs(path);
    logger.info(`Downloaded file on ${locator} to ${path}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error downloading file');

  }
};

/**
 * Uploads files to a specified element.
 * @param {string | Locator} input - The element to upload files to.
 * @param {UploadValues} path - The files to upload.
 * @returns {Promise<void>} - No return value, just uploads the files to the element.
 */
export async function attachFilesToFileChooser(input: string | Locator, path: UploadValues): Promise<void> {
  try {
    const fileChooserPromise = getPage().waitForEvent('filechooser');
    const locator = getLocator(input);
    await click(locator);

    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path);
    logger.info(`Successfully selected and uploaded the file by FileChooser to: ${locator}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error uploading files to file chooser');

  }
};

/**
 * Uploads files to a specified element.
 * @param {string | Locator} input - The element to upload files to.
 * @param {UploadValues} path - The files to upload.
 * @param {UploadOptions} options - The upload options.
 * @returns {Promise<void>} - No return value, just uploads the files to the element.
 */
export async function uploadFiles(input: string | Locator, path: UploadValues, options?: UploadOptions): Promise<void> {
  try {
    const locator = getLocator(input);
    await locator.setInputFiles(path, options);
    logger.info(`Successfully selected and uploaded file by SetInputFiles to: ${locator}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error uploading files');

  }
};

/**
 * Scrolls a specified element into view.
 * @param {string | Locator} input - The element to scroll into view.
 * @param {TimeoutOption} options - The timeout options.
 * @returns {Promise<void>} - No return value, it just scrolls the element into view.
 */
export async function scrollLocatorIntoView(input: string | Locator, options?: TimeoutOption): Promise<void> {
  try {
    const locator = getLocator(input);
    await locator.scrollIntoViewIfNeeded(options);
    logger.info(`Scrolled into view location at element: ${locator}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error scrolling element into view');

  }
};

/**
 * 6. JS: This section contains functions that use JavaScript to interact with elements on a web page.
 * These functions include clicking on an element using JavaScript.
 */

/**
 * Clicks on a specified element using JavaScript.
 * @param {string | Locator} input - The element to click on.
 * @param {TimeoutOption} options - The timeout options.
 * @returns {Promise<void>} - No return value, just clicks the element.
 */
export async function clickByJS(input: string | Locator, options?: TimeoutOption): Promise<void> {
  try {
    const locator = getLocator(input);
    await locator.evaluate('el => el.click()', options);
    logger.info(`Successfully clicked: ${locator} by JavaScript`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error clicking element by JavaScript');

  }
};

/**
 * Returns the inner text of a Locator object.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<string>} - The inner text of the Locator.
 */
export async function getText(input: string | Locator, options?: TimeoutOption): Promise<string> {
  try {
    const locator = getLocator(input);
    let extractedText = await locator.innerText(options);
    logger.info(`Current Inner Text of: ${locator} is: ${extractedText}`);
    return extractedText;
  } catch (error) {
    throw errorHandler.handleError(error, 'Error retrieving inner text');

  }
};

/**
 * Returns the inner text of all Locator objects.
 * @param {string | Locator} input - The input to create the Locator from.
 * @returns {Promise<Array<string>>} - The inner text of all Locator objects.
 */
export async function getAllTexts(input: string | Locator): Promise<Array<string>> {
  try {
    const locator = getLocator(input);
    let extractedTexts: Array<string> = await locator.allInnerTexts();
    logger.info(`Current Inner Texts of: ${locator} are: ${extractedTexts}`);
    return extractedTexts;
  } catch (error) {
    throw errorHandler.handleError(error, 'Error retrieving inner texts');

  }
};

/**
 * Returns the input value of a Locator object.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<string>} - The input value of the Locator.
 */
export async function getInputValue(input: string | Locator, options?: TimeoutOption): Promise<string> {
  try {
    const locator = getLocator(input);
    let extractedValue = await locator.inputValue(options);
    logger.info(`Current input value of: ${locator} is: ${extractedValue}`);
    return extractedValue;
  } catch (error) {
    throw errorHandler.handleError(error, 'Error retrieving input value');

  }
};

/**
 * Returns the input values of all Locator objects.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<Array<string>>} - The input values of all Locator objects.
 */
export async function getAllInputValues(input: string | Locator, options?: TimeoutOption): Promise<Array<string>> {
  try {
    const locators = await getAllLocators(input);
    let extractedValues = await Promise.all(locators.map(locator => getInputValue(locator, options)));
    logger.info(`Current input values: ${extractedValues}`);
    return extractedValues;
  } catch (error) {
    throw errorHandler.handleError(error, 'Error retrieving input values');

  }
};

/**
 * Returns the attribute of a Locator object.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {string} attributeName - The name of the attribute to get.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<null | string>} - The attribute of the Locator if present or null if absent.
 */
export async function getAttribute(
  input: string | Locator,
  attributeName: string,
  options?: TimeoutOption,
): Promise<null | string> {
  try {
    const locator = getLocator(input);
    let extractedValue = await locator.getAttribute(attributeName, options);
    logger.info(`Current attribute of ${attributeName} for ${locator} is: ${extractedValue}`);
    return extractedValue;
  } catch (error) {
    throw errorHandler.handleError(error, 'Error retrieving attribute');

  }
};

/**
 * Saves the storage state of the page.
 * @param {string} [path] - Optional path to save the storage state to.
 * @returns {Promise<void>} - No return value, just saves the storage state.
 */
export async function saveStorageState(path?: string): Promise<void> {
  try {
    await getPage().context().storageState({ path: path });
    logger.info(`Stored current page context to ${path}`);
  } catch (error) {
    throw errorHandler.handleError(error, 'Error saving storage state');

  }
};

/**
 * Returns the URL of the page.
 * @param {NavigationOptions} [options] - Optional navigation options.
 * @returns {Promise<string>} - The URL of the page.
 */
export async function getURL(options: NavigationOptions = { waitUntil: 'load' }): Promise<string> {
  try {
    await waitForPageLoadState(options);
    let currentUrl = getPage().url();
    logger.info(`Current URL of page is: ${currentUrl}`);
    return currentUrl;
  } catch (error) {
    // Using your error handler function for consistent error logging
    throw errorHandler.handleError(error, 'Error retrieving URL');
  }
};

/**
 * Returns the count of Locator objects.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<number>} - The count of the Locator objects.
 */
export async function getLocatorCount(input: string | Locator, options?: TimeoutOption): Promise<number> {
  const timeoutInMs = options?.timeout || INSTANT_TIMEOUT;
  try {
    if (await isElementAttached(input, { timeout: timeoutInMs })) {
      let noOfLocator = (await getAllLocators(input)).length;
      logger.info(`Current number of elements is: ${noOfLocator}`);
      return noOfLocator;
    }
  } catch (error) {
    // Using your error handler function for consistent error logging
    throw errorHandler.handleError(error, 'Error retrieving locator count');
  }
  return 0;
};

/**
 * Checks if a Locator object is attached to DOM.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<boolean>} - True if the Locator is attached, false otherwise.
 */
export async function isElementAttached(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  const locator = getLocator(input); // Assuming getLocator returns a Playwright Locator
  const timeoutInMs = options?.timeout || SMALL_TIMEOUT;

  try {
    await locator.waitFor({ state: 'attached', timeout: timeoutInMs });
    return true;
  } catch (error) {
    throw errorHandler.handleError(error, `Error checking if element is attached: ${String(input)}`);
  }
};


/**
 * Checks if a Locator object is attached to DOM and is visible.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<boolean>} - True if the Locator is visible, false otherwise.
 */
export async function isElementVisible(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  const locator = getLocator(input);
  const timeoutInMs = options?.timeout || SMALL_TIMEOUT;
  const startTime = Date.now();
  try {
    while (Date.now() - startTime < timeoutInMs) {
      if (await locator.isVisible(options)) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  } catch (error) {
    throw errorHandler.handleError(error, `Error checking if element is visible: ${String(input)}`);
  }
  return false;
};



/**
 * Checks if a Locator object is hidden or not present in DOM.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<boolean>} - True if the Locator is hidden, false otherwise.
 */
export async function isElementHidden(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  const locator = getLocator(input);
  const timeoutInMs = options?.timeout || SMALL_TIMEOUT;
  const startTime = Date.now();
  try {
    while (Date.now() - startTime < timeoutInMs) {
      if (await locator.isHidden(options)) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  } catch (error) {
    throw errorHandler.handleError(error, `Error checking if element is hidden: ${String(input)}`);
  }
  return false;
};

/**
 * Checks if a Locator object is checked.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<boolean>} - True if the Locator is checked, false otherwise.
 */
export async function isElementChecked(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  try {
    if (await isElementVisible(input, options)) {
      return await getLocator(input).isChecked(options);
    }
  } catch (error) {
    throw errorHandler.handleError(error, `Error checking if element is checked: ${String(input)}`);
  }
  return false;
};
