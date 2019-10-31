const createStorageMock = (): any => {
  let storage = {};

  return {
    getItem: (key: any): any => key in storage ? storage[key] : null,
    setItem: (key: any, value: any): any => storage[key] = value || "",
    removeItem: (key: any): any => delete storage[key],
    clear: (): any => storage = {},
  };
};

Object.defineProperty(window, "CSS", { value: null });
Object.defineProperty(window, "localStorage", { value: createStorageMock() });
Object.defineProperty(window, "sessionStorage", { value: createStorageMock() });
Object.defineProperty(document, "doctype", {
  value: "<!DOCTYPE html>"
});
Object.defineProperty(window, "getComputedStyle", {
  value: () => {
    return {
      display: "none",
      appearance: ["-webkit-appearance"]
    };
  }
});

/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, "transform", {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});
