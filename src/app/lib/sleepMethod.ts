/**
 * A method to keep wait a certain period of time to hold a task
 *
 * @param {number} ms - a number to hold next called
 * @return {Promise<async>} - return a promise
 */
let timeoutIds: number[] = [];

// a default wait method
export const Sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve();
    }, ms);
    timeoutIds.push(timeoutId as unknown as number);
  });
};

/**
 * Clear all time out if it's present
 * @return {void} - return nothing
 */

export const clearAllTimeouts = () => {
  if (timeoutIds?.length) {
    timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId as unknown as number));
    // Type assertion
    timeoutIds = [];
  }
};
