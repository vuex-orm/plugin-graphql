/**
 * Capitalizes the first letter of the given string.
 *
 * @param {string} string
 * @returns {string}
 */
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
