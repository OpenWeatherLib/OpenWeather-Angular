module.exports = {
    preset: "jest-preset-angular",
    setupFilesAfterEnv: [
      "<rootDir>/src/setup.jest.ts"
    ],
    roots: [ "src/lib" ],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    },
    collectCoverageFrom: [
      "src/lib/**/*.ts"
    ],
    coveragePathIgnorePatterns: [
      ".*\\.d\\.ts",
      ".*\\.mock\\.ts",
      "<rootDir>/node_modules/"
    ],
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
      "@app/(.*)": "<rootDir>/src/app/$1",
      "@lib/(.*)": "<rootDir>/src/lib/$1"
    },
    reporters: [
      "default",
      ["./node_modules/jest-html-reporter", {
        "pageTitle": "Test Report",
        "includeFailureMsg": true
      }]
    ]
  };
  