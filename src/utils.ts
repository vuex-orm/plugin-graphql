/**
 * Capitalizes the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
export function upcaseFirstLetter (input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

/**
 * Down cases the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
export function downcaseFirstLetter (input: string) {
  return input.charAt(0).toLowerCase() + input.slice(1);
}
