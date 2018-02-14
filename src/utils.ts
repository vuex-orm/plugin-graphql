/**
 * Capitalizes the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
export function capitalizeFirstLetter (input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}
