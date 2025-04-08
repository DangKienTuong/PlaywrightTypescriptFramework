/**
 * Get a random value from an enum.
 * 
 * @param enumType - The enum from which a random value should be selected.
 * @returns A random value from the given enum.
 */
export function getRandomEnumValue<T extends { [key: string]: string | number }>(enumType: T): T[keyof T] {
    // Get all the values of the enum as an array and cast to Array<T[keyof T]> to satisfy the return type
    const values = Object.values(enumType) as Array<T[keyof T]>;

    // Generate a random index to select a value from the enum values array
    const randomIndex = Math.floor(Math.random() * values.length);

    // Return the random value from the enum
    return values[randomIndex];
};

/**
 * Converts a string to the corresponding enum value.
 * 
 * @param value - The string value to convert to the enum.
 * @param enumType - The enum type to look up the value in.
 * @returns The corresponding enum value.
 * @throws Error if the value is a number or doesn't match any enum value.
 */
export function stringToEnum<T>(value: string, enumType: T): T[keyof T] {
    // Check if the value exists in the enum
    const enumValue = enumType[value as keyof T];

    if (enumValue === undefined) {
        throw new Error(`Invalid value: ${value} does not exist in the enum.`);
    }

    // Check if the value is a valid number (do this after enum check)
    if (!isNaN(Number(value))) {
        throw new Error("Value cannot be a number.");
    }

    return enumValue;
};

/**
 * Convert an object to an ExpandoObject (with properties excluding null or empty string values).
 * 
 * @param objectToTransform - The object to transform.
 * @returns A new object with non-null, non-empty string properties.
 */
export function convertToObjectWithoutPropertiesWithNullValues<T extends { [key: string]: any }>(objectToTransform: T): Record<string, any> {
    // Initialize a new object to hold the non-null and non-empty string values
    const returnClass: Record<string, any> = {};

    // Loop through each property of the object using Object.entries()
    for (const [key, value] of Object.entries(objectToTransform)) {
        // Check if the value is either null or an empty string (or contains only whitespaces)
        const valueIsNotAString = !(value && typeof value === 'string' && value.trim().length > 0);

        // Add to returnClass if the value is neither null nor an empty string
        if (valueIsNotAString && value != null) {
            returnClass[key] = value;
        }
    }

    return returnClass;
};

/**
 * Get the value of a property dynamically from an object.
 * 
 * @param obj - The object to retrieve the property from.
 * @param propertyName - The name of the property to retrieve.
 * @returns The value of the specified property.
 * @throws An error if the object is null or the property is not available.
 */
export function getPropertyValue<T>(obj: T, propertyName: keyof T): any {
    if (!obj) {
        throw new Error(`Object must not be null or undefined.`);
    }

    // Ensure obj is an object and not a primitive type
    if (typeof obj !== 'object') {
        throw new Error(`The provided value is not an object.`);
    }

    if (!(propertyName in obj)) {
        throw new Error(`Property '${String(propertyName)}' does not exist on the object.`);
    }

    return obj[propertyName];
};

/**
 * Extracts the property name from a lambda function for an object of type T.
 * 
 * @param property - A lambda function that returns the property from which the name will be extracted.
 * @param isClassProperty - A flag indicating whether to check for a class property or a property of any object.
 * @returns The name of the property.
 * @throws An error if the property is null or the lambda does not represent a valid property.
 */
export function getPropertyName<T>(property: (obj: T) => any, isClassProperty: boolean = true): string {
    if (!property) {
        throw new Error("The property argument must not be null or undefined.");
    }

    const funcString = property.toString();

    // Regex to extract the property name from the lambda function
    const regex = isClassProperty ? /return\s+this\.([a-zA-Z0-9_]+)/ : /return\s+([a-zA-Z0-9_]+)/;
    const match = funcString.match(regex);

    if (!match) {
        throw new Error("The lambda expression must represent a property of the form: '() => Class.property'");
    }

    return match[1];
};

/**
 * Truncate a JSON object by first converting it to a string, then truncating that string, 
 * adding '...' at the end to indicate truncation. Truncates both property names and values.
 * 
 * @param jsonObject - The JSON object to truncate.
 * @param maxLength - The maximum number of characters to retain in the truncated JSON string.
 * @returns The stringified truncated JSON, with '...' added if truncated.
 */
export function truncateJsonObject(jsonObject: object, maxLength: number): string {
    // Convert the JSON object to a string
    let jsonString = JSON.stringify(jsonObject);

    // If the string exceeds maxLength, truncate it
    if (jsonString.length > maxLength) {
        // Truncate the JSON string and add '...' at the end
        jsonString = jsonString.slice(0, maxLength) + '...';
    }

    return jsonString;
};

/**
 * Checks if the provided value is a simple type (primitive or built-in objects like Date, RegExp, etc.).
 *
 * @param value - The value to check the type of.
 * @returns True if the type is a simple type, false otherwise.
 */
export function isSimpleType(value: any): boolean {
    if (value === null || value === undefined) return false;

    const type = typeof value;

    // Check for primitive types
    if (type === 'boolean' || type === 'number' || type === 'string' || type === 'symbol' || type === 'bigint') {
        return true;
    }

    // Check for special built-in types
    return (
        value instanceof Date ||      // Date
        value instanceof RegExp ||    // Regular Expression
        value instanceof Error ||     // Error
        value instanceof Map ||       // Map
        value instanceof Set ||       // Set
        value instanceof Array ||     // Array
        value instanceof Function     // Function
    );
};

