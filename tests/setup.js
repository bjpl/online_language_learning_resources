// ===================================
// Vitest Test Setup
// ===================================
// This file runs before all tests

// Mock browser globals if needed
global.languageData = {};

// Setup DOM helpers
global.createMockElement = (tag, attributes = {}) => {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
};

// Mock localStorage
if (typeof localStorage === 'undefined') {
  global.localStorage = {
    store: {},
    getItem(key) {
      return this.store[key] || null;
    },
    setItem(key, value) {
      this.store[key] = String(value);
    },
    removeItem(key) {
      delete this.store[key];
    },
    clear() {
      this.store = {};
    },
  };
}

// Suppress console during tests (can be configured per test)
// global.console = {
//   ...console,
//   log: vi.fn(),
//   debug: vi.fn(),
//   info: vi.fn(),
//   warn: console.warn,
//   error: console.error,
// };
