module.exports ={
    preset: "ts-jest",
    testEnvironment: "node",
    coverageDirectory: "coverage",
    collectCoverageFrom: ["app/**/*.{js,ts}"],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0
        }
    },
    moduleNameMapper: {
        "app/(.*)": "<rootDir>/app/$1"
    },
    moduleDirectories: ["node_modules", "app"]
}