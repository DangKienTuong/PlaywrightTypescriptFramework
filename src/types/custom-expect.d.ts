// custom-expect.d.ts
import { expect as originalExpect, Matchers } from '@playwright/test';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeGreaterThan(expected: number): R;
      toBeLessThan(expected: number): R;
      toBeDefined(): R;
      toBeTruthy(): R;
      toBeFalsy(): R;
    }
  }
};

// Augmenting the existing Expect type with our custom matchers
declare global {
  // Extend Playwright's built-in matchers with our custom ones
  namespace PlaywrightTest {
    interface Matchers<R> {
      toHaveText(expected: string | RegExp): R;
      toContain(expected: string | number | boolean | any[]): R;
      toMatch(expected: string | RegExp): R;
      toMatchSnapshot(name?: string, options?: { maxDiffSize?: number; threshold?: number }): R;
      toEqual(expected: any): R;
      toStrictEqual(expected: any): R;
      toHaveLength(expected: number): R;
      toBeInstanceOf(expected: Function): R;
      toHaveProperty(path: string | string[], value?: any): R;
      toBeCalled(): R;
      toBeCalledWith(...args: any[]): R;
      toBeLessThan(expected: number): R;
    }
  }
}
