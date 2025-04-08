/**
 * Generates a random double value within the specified range and rounds it to a certain number of decimal places.
 * 
 * @param {number} minValue - The minimum value of the random number range.
 * @param {number} maxValue - The maximum value of the random number range.
 * @param {number} decimalPlaces - The number of decimal places to round the result to.
 * @return {number} A random number between `minValue` and `maxValue` with the specified number of decimal places.
 */
export function nextDouble(minValue: number, maxValue: number, decimalPlaces: number): number {
    const randNumber = Math.random() * (maxValue - minValue) + minValue;
    return parseFloat(randNumber.toFixed(decimalPlaces));
};