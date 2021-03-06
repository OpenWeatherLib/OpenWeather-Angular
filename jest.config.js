module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/src/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
      astTransformers: [
        "jest-preset-angular/build/InlineFilesTransformer",
        "jest-preset-angular/build/StripStylesTransformer"
      ],
    },
  },
  preset: "jest-preset-angular",
  transformIgnorePatterns: ["^.+\\.js$"],
  setupFilesAfterEnv: [
    "<rootDir>/src/setup.jest.ts"
  ],
  roots: ["src/lib"],
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 70,
      functions: 90,
      lines: 95
    }
  },
  collectCoverageFrom: [
    "src/lib/**/*.ts"
  ],
  coveragePathIgnorePatterns: [
    ".*\\.d\\.ts",
    ".*\\.mock\\.ts",
    "<rootDir>/node_modules/",
    "index.ts",
    ".*\\.module.ts",
    ".*\\.decorator.ts"
  ],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/app/$1",
    "@environments/(.*)": "<rootDir>/src/environments/$1",
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
