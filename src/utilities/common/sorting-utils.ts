/**
 * Checks if an array of numbers is sorted in ascending order.
 * 
 * @param {number[]} arr - The array of numbers to check.
 * @return {boolean} `true` if the array is sorted in ascending order, `false` otherwise.
 */
export function isSortedAscending(arr: number[]): boolean {
    return arr.every((value, index) => index === 0 || arr[index - 1] <= value);
};

/**
 * Checks if an array of strings is sorted in ascending order.
 * 
 * @param {string[]} arr - The array of strings to check.
 * @return {boolean} `true` if the array is sorted in ascending order, `false` otherwise.
 */
export function isSortedAscendingStrings(arr: string[]): boolean {
    return arr.every((value, index) => index === 0 || arr[index - 1].localeCompare(value) <= 0);
};

/**
 * Checks if an array of numbers is sorted in descending order.
 * 
 * @param {number[]} arr - The array of numbers to check.
 * @return {boolean} `true` if the array is sorted in descending order, `false` otherwise.
 */
export function isSortedDescending(arr: number[]): boolean {
    return arr.every((value, index) => index === 0 || arr[index - 1] >= value);
};

/**
 * Checks if an array of strings is sorted in descending order.
 * 
 * @param {string[]} arr - The array of strings to check.
 * @return {boolean} `true` if the array is sorted in descending order, `false` otherwise.
 */
export function isSortedDescendingStrings(arr: string[]): boolean {
    return arr.every((value, index) => index === 0 || arr[index - 1].localeCompare(value) >= 0);
};

/**
 * Checks if `listB` is a subsequence of `listA`.
 * 
 * @param {T[]} listA - The first list to search within.
 * @param {T[]} listB - The second list to search for as a subsequence.
 * @return {boolean} `true` if `listB` is a subsequence of `listA`, `false` otherwise.
 */
export function containsSequence<T>(listA: T[], listB: T[]): boolean {
    const innerCount = listB.length;
    if (innerCount === 0) return true; // Early exit if listB is empty

    for (let i = 0; i <= listA.length - innerCount; i++) {
        // Check if the slice of listA matches listB
        if (listA.slice(i, i + innerCount).every((value, index) => value === listB[index])) {
            return true;
        }
    }
    return false;
};
