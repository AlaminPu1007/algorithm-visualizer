/*
 This file contains common setup logic to be executed before running each test file in Jest.
  It initializes any necessary configurations, mocks, or environment setups required for testing purposes.
  Developers can define global setup functions, such as setting up mock modules or configuring test environments,
  to ensure consistent behavior across all tests in the project.
 */

import '@testing-library/jest-dom';

// do setup once, for entire other test files also
//This setup is necessary because IntersectionObserver isn't available in the test environment

beforeAll(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});
