/**
 * Build exact url to resource in public folder
 * @param pathToPublicResource The path to the resource in public folder
 * @returns A string represents an url to resource
 */
export function buildPathToPublicResource(pathToPublicResource: string): string {
  if (pathToPublicResource[0] === '/') pathToPublicResource = pathToPublicResource.slice(1);
  return `${process.env.PUBLIC_URL}/${pathToPublicResource}`;
}

export function isNumeric(num: any) {
  return !isNaN(num) && !isNaN(parseFloat(num));
}

/**
 * Cast a value to BigNumber instance.
 * @param value - The value
 * @returns An instance of BigNumber or NaN if value isn't a valid number.
 */

export function getErrorMessage(error: any): string | undefined {
  return error ? error.reason ?? error.message : undefined;
}

export function handleError(error: any, notify?: (msg: string) => void) {
  const msg = getErrorMessage(error);
  if (msg && typeof notify === 'function') {
    notify(msg);
  }
}

export function copyTextToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function throttle(callback: (...args: any[]) => any, delay: number = 1000): (...args: any[]) => void {
  let shouldWait: boolean = false;

  return (...args: any[]) => {
    if (shouldWait) return;

    callback(...args);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}

export const sleep = (milisecond: number) => new Promise((resolve) => setTimeout(resolve, milisecond));
