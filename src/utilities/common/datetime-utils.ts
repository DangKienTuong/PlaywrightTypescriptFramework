/**
 * Extracts only the date part (YYYY-MM-DD) from a Date object.
 * @param date - The Date object to extract the date from.
 * @returns A string representing the date in YYYY-MM-DD format.
 */
export function getOnlyDate(date: Date): string {
    return date.toISOString().split('T')[0];
};

/**
 * Adds a specified number of years to a given Date object.
 * @param date - The Date object to add years to.
 * @param years - The number of years to add to the date.
 * @returns A string representing the new date in ISO format.
 */
export function addYearsToDate(date: Date, years: number): string {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate.toISOString();
};

/**
 * Subtracts a specified number of years from a given Date object.
 * @param date - The Date object to subtract years from.
 * @param years - The number of years to subtract from the date.
 * @returns A string representing the new date in ISO format.
 */
export function subtractYearsFromDate(date: Date, years: number): string {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() - years);
    return newDate.toISOString();
};

/**
 * Formats the current date as a string according to the specified format type.
 * @param {string} formatType - The type of date format to return.
 * @return {string} The current date formatted as per the specified format type.
 */
export function getCurrentDateWithFormat(formatType: string): string {
    const currentDate = new Date();

    const formats: { [key: string]: string } = {
        "short": "short",
        "long": "long",
        "timestamp": "timestamp",
        "date": "date",
    };

    if (formats[formatType]) {
        return formatDateToString(currentDate, formatType);
    }

    return currentDate.toISOString();
};

/**
 * Formats a given date to a string based on the specified format type.
 * @param {Date} dateToFormat - The date to be formatted.
 * @param {string} formatType - The format type (e.g., "short", "long", "yyyyMMdd", etc.).
 * @return {string} The formatted date string.
 */
export function formatDateToString(dateToFormat: Date, formatType: string): string {
    switch (formatType) {
        case "short":
            return dateToFormat.toLocaleDateString('en-US');
        case "long":
            return dateToFormat.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        case "yyyyMMdd":
        case "date":
            return dateToFormat.toISOString().slice(0, 10).replace(/-/g, '');
        default:
            return dateToFormat.toISOString();
    }
};

/**
 * Custom format for timestamp (yyyyMMddhhmmss)
 * @param {Date} dateToFormat - The date to be formatted.
 * @return {string} The formatted timestamp string.
 */
export function getTimestampFormat(dateToFormat: Date): string {
    const year = dateToFormat.getFullYear();
    const month = (dateToFormat.getMonth() + 1).toString().padStart(2, '0');
    const day = dateToFormat.getDate().toString().padStart(2, '0');
    const hours = dateToFormat.getHours().toString().padStart(2, '0');
    const minutes = dateToFormat.getMinutes().toString().padStart(2, '0');
    const seconds = dateToFormat.getSeconds().toString().padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

/**
* Returns a "random" number based on the current timestamp formatted as `yyyyMMddhhmmss`.
* @return {string} The formatted timestamp as a string, similar to `yyyyMMddhhmmss`.
*/
export function getRandomNumberByTimeStamp(): string {
    return getCurrentDateWithFormat('timestamp');
};

/**
 * Returns a "random" number based on the current date formatted as `yyyyMMdd`.
 * @return {string} The formatted date as a string, similar to `yyyyMMdd`.
 */
export function getRandomNumberByDate(): string {
    return getCurrentDateWithFormat('date');
};

/**
 * Formats the weekday for a given date based on the fullWeekDayName flag.
 * @param {Date} dateToGetWeekDay - The date to get the weekday from.
 * @param {boolean} fullWeekDayName - Flag to determine whether to return full weekday name (e.g., "Monday") or abbreviated weekday name (e.g., "Mon").
 * @return {string} The formatted weekday name.
 */
export function getWeekDayForDate(dateToGetWeekDay: Date, fullWeekDayName: boolean): string {
    return formatDateToString(dateToGetWeekDay, fullWeekDayName ? "long" : "short");
};

/**
 * Extracts the day from a given date.
 * @param {Date} dateToExtract - The date to extract the day from.
 * @return {number} The day of the month (1 to 31).
 */
export function extractDayFromDate(dateToExtract: Date): number {
    return dateToExtract.getDate();
};

/**
 * Extracts the month from a given date.
 * @param {Date} dateToExtract - The date to extract the month from.
 * @return {number} The month of the year (1 to 12).
 */
export function extractMonthFromDate(dateToExtract: Date): number {
    return dateToExtract.getMonth() + 1;
};

/**
 * Extracts the month name from a given date with an optional format.
 * @param {Date} dateToExtract - The date to extract the month name from.
 * @param {string | null} monthFormat - The format for the month name. Can be "MMMM" (full month name) or "MMM" (abbreviated month name).
 * @return {string} The formatted month name (e.g., "January" or "Jan").
 */
export function extractMonthNameFromDate(dateToExtract: Date, monthFormat: string | null = null): string {
    return formatDateToString(dateToExtract, monthFormat === "MMMM" ? "long" : "short");
};

/**
 * Extracts the year from a given date.
 * @param {Date} dateToExtract - The date to extract the year from.
 * @return {number} The year (e.g., 2025).
 */
export function extractYearFromDate(dateToExtract: Date): number {
    return dateToExtract.getFullYear();
};

/**
 * Checks if a given date is between a start and end date (inclusive).
 * @param {Date} dataToCheck - The date to check.
 * @param {Date} rangeBeg - The beginning of the date range.
 * @param {Date} rangeEnd - The end of the date range.
 * @return {boolean} `true` if the date is between the range, otherwise `false`.
 */
export function isBetweenDate(dataToCheck: Date, rangeBeg: Date, rangeEnd: Date): boolean {
    return dataToCheck >= rangeBeg && dataToCheck <= rangeEnd;
};

/**
 * Checks if a given date is a working day (Monday to Friday).
 * @param {Date} date - The date to check.
 * @return {boolean} `true` if the date is a working day, otherwise `false`.
 */
export function isWorkingDay(date: Date): boolean {
    const day = date.getDay();
    return day !== 0 && day !== 6;
};

/**
 * Checks if a given date is a weekend (Saturday or Sunday).
 * @param {Date} date - The date to check.
 * @return {boolean} `true` if the date is a weekend, otherwise `false`.
 */
export function isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
};

/**
 * Validates if the given date string matches one of the predefined date formats.
 * @param {string} dateTime - The date string to validate.
 * @return {boolean} `true` if the date string matches one of the formats, otherwise `false`.
 */
export function isValidDateFormat(dateTime: string): boolean {
    const date = Date.parse(dateTime); // Try to parse with default JavaScript parsing
    return !isNaN(date);
};

/**
 * Converts fractional hours to a formatted string based on the specified format.
 * @param {number} hours - The fractional hours to convert.
 * @param {string} [formatType] - The format type (e.g., "{0}:{1}" for "hh:mm").
 * @return {string} The formatted time string.
 */
export function fractionalHoursToString(hours: number, formatType: string | null = null): string {
    if (!formatType) formatType = "{0}:{1}";
    const tspan = new Date(hours * 3600 * 1000); // Convert hours to milliseconds
    return formatType.replace("{0}", Math.floor(hours).toString()).replace("{1}", tspan.getMinutes().toString().padStart(2, '0'));
};

/**
 * Converts fractional hours to a formatted string with the default format.
 * @param {number} hours - The fractional hours to convert.
 * @return {string} The formatted time string.
 */
export function fractionalHoursToStringWithoutCustomFormat(hours: number): string {
    return fractionalHoursToString(hours);
};



/**
 * Generates a friendly date string for today, yesterday, or the day of the week, with an optional time.
 * 
 * @param {Date} dateToGet - The date to convert.
 * @param {boolean} showTime - Whether to include the time in the result.
 * @return {string} The friendly formatted date string.
 */
export function friendlyDateString(dateToGet: Date, showTime: boolean): string {
    let formattedDate: string;

    if (dateToGet.toDateString() === new Date().toDateString()) {
        formattedDate = "Today";
    } else if (dateToGet.toDateString() === new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()) {
        formattedDate = "Yesterday";
    } else if (dateToGet > new Date(new Date().setDate(new Date().getDate() - 6))) {
        formattedDate = dateToGet.toLocaleDateString('en-US', { weekday: 'long' }); // Day of the week
    } else {
        formattedDate = dateToGet.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    if (showTime) {
        formattedDate += ` @ ${dateToGet.toLocaleTimeString('en-US').toLowerCase()}`;
    }

    return formattedDate;
};

/**
 * Rounds a given Date to the nearest minute interval (e.g., 10th minute).
 * @param {Date} date - The date to round.
 * @param {number} interval - The minute interval to round to (e.g., 5, 10, 15, etc.).
 * @return {Date} A new Date rounded to the nearest minute interval.
 */
export function roundDateToMinuteInterval(date: Date, interval: number): Date {
    const roundedDate = new Date(date);
    const minutes = roundedDate.getMinutes();
    const roundedMinutes = Math.round(minutes / interval) * interval;
    roundedDate.setMinutes(roundedMinutes);
    roundedDate.setSeconds(0);
    roundedDate.setMilliseconds(0);
    return roundedDate;
};

/**
 * Rounds a given Date to the nearest minute interval and returns the formatted string.
 * @param {Date} date - The date to round.
 * @param {number} interval - The minute interval to round to (e.g., 5, 10, 15, etc.).
 * @return {string} The rounded Date as a string formatted in ISO format.
 */
export function roundDateToMinuteIntervalDate(date: Date, interval: number): string {
    const roundedDate = roundDateToMinuteInterval(date, interval);
    return roundedDate.toISOString();
};