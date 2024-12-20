/**
 * @description target is includes current all
 * @param current array
 * @param target array
 * @returns boolean
 */
export function isAllDuplicates(
  current: unknown[],
  target: unknown[],
): boolean {
  return current.every(v => target.includes(v))
}

/**
 * @description target is exclude current all
 * @param current array
 * @param target array
 * @returns boolean
 */
export function isAllNoDuplicates(
  current: unknown[],
  target: unknown[],
): boolean {
  return current.every(v => !target.includes(v))
}

/**
 * @description target is include current some
 * @param current array
 * @param target array
 * @returns boolean
 */
export function isSomeDuplicates(
  current: unknown[],
  target: unknown[],
): boolean {
  return current.some(v => target.includes(v))
}
