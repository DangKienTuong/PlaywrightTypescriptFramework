import { expect as originalExpect } from '@playwright/test';
import { logger } from '@utilities/reporter/custom-logger';

// Helper function to narrow type to string or RegExp
function isStringOrRegExp(value: any): value is string | RegExp {
  return typeof value === 'string' || value instanceof RegExp;
}

// Helper function to narrow type to number or string
function isStringOrNumber(value: any): value is string | number {
  return typeof value === 'string' || typeof value === 'number';
}

// A utility function for handling errors and logging them
export function handleError(actual: any, expected: any, error: unknown, matcher: string): void {
    const typedError = error as Error;
    const errorMessage = `Expectation Failed: Expected ${actual} to ${matcher} ${expected ? `(${expected})` : ''}. Error: ${typedError.message}`;
    logger.error(errorMessage);
    throw typedError;  // Re-throw the error to maintain the test failure behavior
  }

// Custom 'toHaveText' matcher for strings or regex with logging
export function toHaveText(actual: any, expected: string | RegExp) {
  if (!isStringOrRegExp(actual)) {
    const error = new Error(`Expected value to be string or RegExp, but got: ${typeof actual}`);
    handleError(actual, expected, error, 'have text');
    return;
  }
  logger.info(`Expecting: Text '${expected}', Actual: ${actual}`);
  try {
    originalExpect(actual).toHaveText(expected);
  } catch (error) {
    handleError(actual, expected, error, 'have text');
  }
}

// Custom 'toContain' matcher with various types (string, number, etc.)
export function toContain(actual: any, expected: string | number | boolean | any[]) {
  if (!isStringOrNumber(actual) && !Array.isArray(actual)) {
    const error = new Error(`Expected value to be string, number, or array, but got: ${typeof actual}`);
    handleError(actual, expected, error, 'contain');
    return;
  }
  logger.info(`Expecting: To Contain '${expected}', Actual: ${actual}`);
  try {
    originalExpect(actual).toContain(expected);
  } catch (error) {
    handleError(actual, expected, error, 'contain');
  }
}

// Custom 'toMatch' matcher for regex matching
export function toMatch(actual: any, expected: string | RegExp) {
  if (!isStringOrRegExp(actual)) {
    const error = new Error(`Expected value to be string or RegExp, but got: ${typeof actual}`);
    handleError(actual, expected, error, 'match');
    return;
  }
  logger.info(`Expecting: Match '${expected}', Actual: ${actual}`);
  try {
    originalExpect(actual).toMatch(expected);
  } catch (error) {
    handleError(actual, expected, error, 'match');
  }
}

// Custom 'toMatchSnapshot' matcher
export function toMatchSnapshot(actual: any, name?: string, options?: { maxDiffSize?: number; threshold?: number }) {
  logger.info(`Expecting: Snapshot Match, Actual: ${actual}`);
  try {
    originalExpect(actual).toMatchSnapshot(name, options);
  } catch (error) {
    handleError(actual, undefined, error, 'match snapshot');
  }
}

// Custom 'toEqual' matcher
export function toEqual(actual: any, expected: any) {
  logger.info(`Expecting: Equal to ${expected}, Actual: ${actual}`);
  try {
    originalExpect(actual).toEqual(expected);
  } catch (error) {
    handleError(actual, expected, error, 'equal');
  }
}

// Custom 'toStrictEqual' matcher
export function toStrictEqual(actual: any, expected: any) {
  logger.info(`Expecting: Strictly Equal to ${expected}, Actual: ${actual}`);
  try {
    originalExpect(actual).toStrictEqual(expected);
  } catch (error) {
    handleError(actual, expected, error, 'strictly equal');
  }
}

// Custom 'toHaveLength' matcher
export function toHaveLength(actual: any, expected: number) {
  if (typeof actual !== 'string' && !Array.isArray(actual) && typeof actual !== 'object') {
    const error = new Error(`Expected value to be string, array, or object, but got: ${typeof actual}`);
    handleError(actual, expected, error, 'have length');
    return;
  }
  logger.info(`Expecting: Length ${expected}, Actual: ${actual}`);
  try {
    originalExpect(actual).toHaveLength(expected);
  } catch (error) {
    handleError(actual, expected, error, 'have length');
  }
}

// Custom 'toBeInstanceOf' matcher
export function toBeInstanceOf(actual: any, expected: Function) {
  logger.info(`Expecting: Instance of ${expected}, Actual: ${actual}`);
  try {
    originalExpect(actual).toBeInstanceOf(expected);
  } catch (error) {
    handleError(actual, expected, error, 'be instance of');
  }
}

// Custom 'toHaveProperty' matcher
export function toHaveProperty(actual: any, path: string | string[], value?: any) {
  logger.info(`Expecting: Property '${path}', Actual: ${actual}`);
  try {
    originalExpect(actual).toHaveProperty(path, value);
  } catch (error) {
    handleError(actual, path, error, 'have property');
  }
}

// Custom 'toBeCalled' matcher for mocks or spies
export function toBeCalled(actual: any) {
  if (typeof actual !== 'function') {
    const error = new Error(`Expected value to be a function, but got: ${typeof actual}`);
    handleError(actual, undefined, error, 'be called');
    return;
  }
  logger.info(`Expecting: Function to be called, Actual: ${actual}`);
  try {
    originalExpect(actual).toBeCalled();
  } catch (error) {
    handleError(actual, undefined, error, 'be called');
  }
}

// Custom 'toBeCalledWith' matcher for mocks or spies
export function toBeCalledWith(actual: any, ...args: any[]) {
  if (typeof actual !== 'function') {
    const error = new Error(`Expected value to be a function, but got: ${typeof actual}`);
    handleError(actual, args, error, 'be called with');
    return;
  }
  logger.info(`Expecting: Function to be called with arguments: ${args}, Actual: ${actual}`);
  try {
    originalExpect(actual).toBeCalledWith(...args);
  } catch (error) {
    handleError(actual, args, error, 'be called with');
  }
}

// Custom 'toBeDefined' matcher
export function toBeDefined(actual: any) {
  logger.info(`Expecting: Defined, Actual: ${actual}`);
  try {
    originalExpect(actual).toBeDefined();
  } catch (error) {
    handleError(actual, undefined, error, 'be defined');
  }
}

// Custom 'toBeTruthy' matcher
export function toBeTruthy(actual: any) {
  logger.info(`Expecting: Truthy, Actual: ${actual}`);
  try {
    originalExpect(actual).toBeTruthy();
  } catch (error) {
    handleError(actual, undefined, error, 'be truthy');
  }
}

// Custom 'toBeFalsy' matcher
export function toBeFalsy(actual: any) {
  logger.info(`Expecting: Falsy, Actual: ${actual}`);
  try {
    originalExpect(actual).toBeFalsy();
  } catch (error) {
    handleError(actual, undefined, error, 'be falsy');
  }
}

// Custom expect function with all the matchers
export function expect<T>(actual: T) {
  return {
    toBe: (expected: T) => {
      logger.info(`Expecting: Equal to ${expected}, Actual: ${actual}`);
      try {
        originalExpect(actual).toBe(expected);
      } catch (error) {
        handleError(actual, expected, error, 'be');
      }
    },
    toHaveText: (expected: string | RegExp) => toHaveText(actual, expected),
    toContain: (expected: string | number | boolean | any[]) => toContain(actual, expected),
    toMatch: (expected: string | RegExp) => toMatch(actual, expected),
    toMatchSnapshot: (name?: string, options?: { maxDiffSize?: number; threshold?: number }) =>
      toMatchSnapshot(actual, name, options),
    toEqual: (expected: any) => toEqual(actual, expected),
    toStrictEqual: (expected: any) => toStrictEqual(actual, expected),
    toHaveLength: (expected: number) => toHaveLength(actual, expected),
    toBeInstanceOf: (expected: Function) => toBeInstanceOf(actual, expected),
    toHaveProperty: (path: string | string[], value?: any) => toHaveProperty(actual, path, value),
    toBeCalled: () => toBeCalled(actual),
    toBeCalledWith: (...args: any[]) => toBeCalledWith(actual, ...args),
    toBeDefined: () => toBeDefined(actual),
    toBeTruthy: () => toBeTruthy(actual),
    toBeFalsy: () => toBeFalsy(actual),
  };
}

